import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { useWebRTC } from '../api/UseWebRTC';
import { useUserMedia } from '../../../shared/hooks/UseUserMedia'; // 👈 Импортируем готовый хук

// --- Типы и Интерфейсы ---
export interface Participant {
    id: string;
    userName: string;
    avatarUrl?: string;
    stream?: MediaStream | null;
    isSpeaking?: boolean;
    isMuted?: boolean;
}

interface VideoCallState {
    participants: Participant[];
    currentUser: Participant;
}

type VideoCallAction =
    | { type: 'ADD_PARTICIPANT'; payload: Participant }
    | { type: 'REMOVE_PARTICIPANT'; payload: string }
    | { type: 'UPDATE_PARTICIPANT'; payload: { id: string; updates: Partial<Participant> } }
    | { type: 'SET_PARTICIPANTS'; payload: Participant[] }
    | { type: 'UPDATE_CURRENT_USER'; payload: Partial<Participant> };

interface VideoCallContextType {
    state: VideoCallState;
    addParticipant: (participant: Participant) => void;
    removeParticipant: (id: string) => void;
    updateParticipant: (id: string, updates: Partial<Participant>) => void;
    setParticipants: (participants: Participant[]) => void;
    updateCurrentUser: (updates: Partial<Participant>) => void;
    // 👇 Добавляем методы управления медиа из хука
    toggleCamera: () => Promise<void>;
    toggleMicrophone: () => void;
    isCameraOn: boolean;
    isMicrophoneOn: boolean;
}

// --- Context ---
const VideoCallContext = createContext<VideoCallContextType | undefined>(undefined);

// --- Reducer ---
const videoCallReducer = (state: VideoCallState, action: VideoCallAction): VideoCallState => {
    switch (action.type) {
        case 'ADD_PARTICIPANT':
            if (state.participants.some(p => p.id === action.payload.id)) {
                return {
                    ...state,
                    participants: state.participants.map(p => 
                        p.id === action.payload.id ? { ...p, ...action.payload } : p
                    )
                };
            }
            return { ...state, participants: [...state.participants, action.payload] };

        case 'REMOVE_PARTICIPANT':
            return { ...state, participants: state.participants.filter(p => p.id !== action.payload) };

        case 'UPDATE_PARTICIPANT':
            return {
                ...state,
                participants: state.participants.map(p =>
                    p.id === action.payload.id ? { ...p, ...action.payload.updates } : p
                )
            };

        case 'SET_PARTICIPANTS':
            return { ...state, participants: action.payload };

        case 'UPDATE_CURRENT_USER':
            return { ...state, currentUser: { ...state.currentUser, ...action.payload } };

        default:
            return state;
    }
};

// --- Provider ---
interface VideoCallProviderProps {
    children: React.ReactNode;
    roomId: string;
    initialParticipants?: Participant[];
    currentUser?: Participant;
}

export const VideoCallProvider: React.FC<VideoCallProviderProps> = ({
    children,
    roomId,
    initialParticipants = [],
    currentUser = { id: 'current-user', userName: 'Вы', isMuted: false, isSpeaking: false }
}) => {
    // 👇 Используем готовый хук для медиа
    const {
        stream: localStream,
        error: mediaError,
        isLoading: mediaLoading,
        isCameraOn,
        isMicrophoneOn,
        startStream,
        stopStream,
        toggleCamera,
        toggleMicrophone
    } = useUserMedia({
        video: false, // Начинаем без видео по умолчанию
        audio: true,  // С микрофоном
        autoStart: true
    });

    const [state, dispatch] = useReducer(videoCallReducer, {
        participants: initialParticipants,
        currentUser: { 
            ...currentUser, 
            isMuted: !isMicrophoneOn // 👈 Синхронизируем с реальным состоянием
        }
    });

    // --- Actions ---
    const addParticipant = useCallback((participant: Participant) => {
        dispatch({ type: 'ADD_PARTICIPANT', payload: participant });
    }, []);

    const removeParticipant = useCallback((id: string) => {
        dispatch({ type: 'REMOVE_PARTICIPANT', payload: id });
    }, []);

    const updateParticipant = useCallback((id: string, updates: Partial<Participant>) => {
        dispatch({ type: 'UPDATE_PARTICIPANT', payload: { id, updates } });
    }, []);

    const setParticipants = useCallback((participants: Participant[]) => {
        dispatch({ type: 'SET_PARTICIPANTS', payload: participants });
    }, []);

    const updateCurrentUser = useCallback((updates: Partial<Participant>) => {
        dispatch({ type: 'UPDATE_CURRENT_USER', payload: updates });
    }, []);

    // --- Effects ---

    // 1. Синхронизация стрима с текущим пользователем
    useCallback(() => {
        updateCurrentUser({ 
            stream: localStream,
            isMuted: !isMicrophoneOn
        });
    }, [localStream, isMicrophoneOn, updateCurrentUser]);

    // 2. WebRTC логика
    useWebRTC({
        roomId,
        localStream,
        addParticipant,
        removeParticipant
    });

    // --- Value ---
    const value: VideoCallContextType = {
        state,
        addParticipant,
        removeParticipant,
        updateParticipant,
        setParticipants,
        updateCurrentUser,
        // 👇 Экспортируем методы управления медиа
        toggleCamera,
        toggleMicrophone,
        isCameraOn,
        isMicrophoneOn
    };

    // --- Render ---
    if (mediaLoading) {
        return <div style={{ color: 'white' }}>Подготовка медиа оборудования...</div>;
    }

    if (mediaError) {
        return <div style={{ color: 'white' }}>Ошибка доступа к медиа: {mediaError}</div>;
    }

    return (
        <VideoCallContext.Provider value={value}>
            {children}
        </VideoCallContext.Provider>
    );
};

// --- Hook ---
export const useVideoCall = (): VideoCallContextType => {
    const context = useContext(VideoCallContext);
    if (context === undefined) {
        throw new Error('useVideoCall must be used within a VideoCallProvider');
    }
    return context;
};
