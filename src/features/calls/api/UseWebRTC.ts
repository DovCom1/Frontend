// hooks/useWebRTC.ts
import { useEffect, useRef, useCallback } from 'react';
import { signalingService } from './SignalingService';
import { SignalingMessageType, SignalingMessage } from './signaling';
import { userState } from '../../../entities/mainUser/model/UserState';
import { Participant } from '../model/VideoCallContext'; // Ваш интерфейс

// STUN-серверы обязательны для работы через NAT
const RTC_CONFIG: RTCConfiguration = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:global.stun.twilio.com:3478' }
    ]
};

interface UseWebRTCProps {
    roomId: string;
    localStream: MediaStream | null;
    addParticipant: (p: Participant) => void;
    removeParticipant: (id: string) => void;
}

export const useWebRTC = ({ roomId, localStream, addParticipant, removeParticipant }: UseWebRTCProps) => {
    // Храним соединения: UserID -> RTCPeerConnection
    const peerConnections = useRef<Map<string, RTCPeerConnection>>(new Map());

    // Создание PeerConnection для конкретного юзера
    const createPeerConnection = (remoteUserId: string, initiator: boolean) => {
        if (peerConnections.current.has(remoteUserId)) {
            console.warn(`Peer connection for ${remoteUserId} already exists`);
            return peerConnections.current.get(remoteUserId);
        }

        const pc = new RTCPeerConnection(RTC_CONFIG);
        peerConnections.current.set(remoteUserId, pc);

        // 1. Добавляем свои треки (камеру/микрофон) в соединение
        if (localStream) {
            localStream.getTracks().forEach(track => {
                pc.addTrack(track, localStream);
            });
        }

        // 2. Обработка входящего потока (когда собеседник включил камеру)
        pc.ontrack = (event) => {
            const [remoteStream] = event.streams;
            console.log(`Received remote stream from ${remoteUserId}`);
            
            // Здесь мы обновляем UI через ваш контекст
            // Важно: нужно как-то получить имя пользователя. Обычно оно приходит в payload при join
            // Для MVP создадим заглушку или возьмем из пришедших данных
            addParticipant({
                id: remoteUserId,
                userName: `User ${remoteUserId.slice(0,4)}`, // В будущем брать из map имен
                stream: remoteStream,
                isMuted: false, 
                isSpeaking: false
            });
        };

        // 3. Обработка ICE кандидатов (сетевые маршруты)
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                signalingService.send(SignalingMessageType.WEBRTC_ICE_CANDIDATE, {
                    ice_candidate: event.candidate.toJSON()
                }, remoteUserId);
            }
        };

        pc.onconnectionstatechange = () => {
             if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed') {
                 removeParticipant(remoteUserId);
                 peerConnections.current.delete(remoteUserId);
             }
        };

        return pc;
    };

    // --- Обработчики сигналов ---

    // 1. Кто-то новый вошел в комнату
    const handleRoomJoin = async (msg: SignalingMessage) => {
        const remoteUserId = msg.from;
        if (remoteUserId === userState.getUserIdSync()) return; // Игнорируем себя

        console.log(`User ${remoteUserId} joined, initiating offer`);
        
        // Мы (старожилы) создаем оффер для новичка
        const pc = createPeerConnection(remoteUserId, true);
        if (!pc) return;

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        signalingService.send(SignalingMessageType.WEBRTC_OFFER, {
            sdp: offer
        }, remoteUserId);
    };

    // 2. Пришел Offer (мы - новичок, или нам звонят)
    const handleWebRTCOffer = async (msg: SignalingMessage) => {
        const remoteUserId = msg.from;
        console.log(`Received Offer from ${remoteUserId}`);

        const pc = createPeerConnection(remoteUserId, false);
        if (!pc || !msg.payload.sdp) return;

        await pc.setRemoteDescription(new RTCSessionDescription(msg.payload.sdp));
        
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        signalingService.send(SignalingMessageType.WEBRTC_ANSWER, {
            sdp: answer
        }, remoteUserId);
    };

    // 3. Пришел Answer (ответ на наш оффер)
    const handleWebRTCAnswer = async (msg: SignalingMessage) => {
        const remoteUserId = msg.from;
        const pc = peerConnections.current.get(remoteUserId);
        
        if (pc && msg.payload.sdp) {
            await pc.setRemoteDescription(new RTCSessionDescription(msg.payload.sdp));
        }
    };

    // 4. Пришел ICE Candidate
    const handleIceCandidate = async (msg: SignalingMessage) => {
        const remoteUserId = msg.from;
        const pc = peerConnections.current.get(remoteUserId);
        
        if (pc && msg.payload.ice_candidate) {
            try {
                await pc.addIceCandidate(new RTCIceCandidate(msg.payload.ice_candidate));
            } catch (e) {
                console.error('Error adding received ice candidate', e);
            }
        }
    };

    // 5. Кто-то вышел
    const handleRoomLeave = (msg: SignalingMessage) => {
        const remoteUserId = msg.from;
        removeParticipant(remoteUserId);
        const pc = peerConnections.current.get(remoteUserId);
        if (pc) {
            pc.close();
            peerConnections.current.delete(remoteUserId);
        }
    };

    // --- Инициализация и подписка ---
    useEffect(() => {
        if (!localStream) return;
        
        const currentUserId = userState.getUserIdSync();
        if (!currentUserId) return;

        // 1. Инициализируем "мостик" между WebRTC и SignalR
        // URL больше не нужен, SignalR уже настроен глобально
        signalingService.connect(); 

        // 2. Подписки (без изменений)
        signalingService.on(SignalingMessageType.ROOM_JOIN, handleRoomJoin);
        signalingService.on(SignalingMessageType.WEBRTC_OFFER, handleWebRTCOffer);
        signalingService.on(SignalingMessageType.WEBRTC_ANSWER, handleWebRTCAnswer);
        signalingService.on(SignalingMessageType.WEBRTC_ICE_CANDIDATE, handleIceCandidate);
        signalingService.on(SignalingMessageType.ROOM_LEAVE, handleRoomLeave);

        // 3. Отправка JOIN
        // Важный момент: SignalR может быть в процессе реконнекта.
        // В идеале нужно следить за флагом isConnected из useSignalRStore, 
        // но для простоты оставим таймаут или просто вызовем send (он проверит коннект внутри)
        const joinTimeout = setTimeout(() => {
             signalingService.send(SignalingMessageType.ROOM_JOIN, {
                roomInfo: { 
                    roomId, 
                    name: 'Meeting',
                    participants: [] 
                } 
            });
        }, 1000); // Чуть увеличим, чтобы SignalR точно успел проснуться если что

        return () => {
            clearTimeout(joinTimeout);
            signalingService.disconnect(); // Это просто снимет слушатели, не разорвет соединение
            peerConnections.current.forEach(pc => pc.close());
            peerConnections.current.clear();
        };
    }, [roomId, localStream]);
};
