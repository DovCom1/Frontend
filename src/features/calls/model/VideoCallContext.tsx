import React, { createContext, useContext, useReducer, useCallback } from 'react';

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
}

const VideoCallContext = createContext<VideoCallContextType | undefined>(undefined);

// Редьюсер для управления состоянием
const videoCallReducer = (state: VideoCallState, action: VideoCallAction): VideoCallState => {
    switch (action.type) {
        case 'ADD_PARTICIPANT':
            // Проверяем, нет ли уже участника с таким ID
            if (state.participants.some(p => p.id === action.payload.id)) {
                console.warn(`Participant with id ${action.payload.id} already exists`);
                return state;
            }
            return {
                ...state,
                participants: [...state.participants, action.payload]
            };

        case 'REMOVE_PARTICIPANT':
            return {
                ...state,
                participants: state.participants.filter(p => p.id !== action.payload)
            };

        case 'UPDATE_PARTICIPANT':
            return {
                ...state,
                participants: state.participants.map(p =>
                    p.id === action.payload.id
                        ? { ...p, ...action.payload.updates }
                        : p
                )
            };

        case 'SET_PARTICIPANTS':
            return {
                ...state,
                participants: action.payload
            };

        case 'UPDATE_CURRENT_USER':
            return {
                ...state,
                currentUser: { ...state.currentUser, ...action.payload }
            };

        default:
            return state;
    }
};

// Провайдер контекста
interface VideoCallProviderProps {
    children: React.ReactNode;
    initialParticipants?: Participant[];
    currentUser?: Participant;
}

export const VideoCallProvider: React.FC<VideoCallProviderProps> = ({
    children,
    initialParticipants = [],
    currentUser = { id: 'current-user', userName: 'Вы', isMuted: false, isSpeaking: false }
}) => {
    const [state, dispatch] = useReducer(videoCallReducer, {
        participants: initialParticipants,
        currentUser
    });

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

    const value = {
        state,
        addParticipant,
        removeParticipant,
        updateParticipant,
        setParticipants,
        updateCurrentUser
    };

    return (
        <VideoCallContext.Provider value={value}>
            {children}
        </VideoCallContext.Provider>
    );
};

// Хук для использования контекста
export const useVideoCall = (): VideoCallContextType => {
    const context = useContext(VideoCallContext);
    if (context === undefined) {
        throw new Error('useVideoCall must be used within a VideoCallProvider');
    }
    return context;
};
