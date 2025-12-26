// contracts/signaling.ts

export enum SignalingMessageType {
    ROOM_JOIN = 'room_join',
    ROOM_INVITE = 'room_invite',
    ROOM_LEAVE = 'room_leave',
    WEBRTC_OFFER = 'webrtc_offer',
    WEBRTC_ANSWER = 'webrtc_answer',
    WEBRTC_ICE_CANDIDATE = 'webrtc_ice_candidate',
    EMOTION_SEND = 'emotion_send',
    ERROR = 'error'
}

export interface SignalingMessage {
    type: SignalingMessageType;
    from: string; // Guid
    to?: string; // Guid (если undefined, то broadcast всем кроме себя)
    payload: {
        roomInfo?: {
            roomId: string;
            name: string;
            participants: any[]; // Типизировать согласно вашему User
        };
        error?: {
            originalType: SignalingMessageType;
            message: string;
        };
        sdp?: RTCSessionDescriptionInit; // offer или answer
        ice_candidate?: RTCIceCandidateInit;
        emotion?: {
            emotion: string;
        };
    };
}
