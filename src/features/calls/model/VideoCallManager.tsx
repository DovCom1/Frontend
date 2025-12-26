import React from 'react';
import { VideoCallMiniInterface } from '../ui/calls-mini/VideoCallMiniInterface';
import { useTestStreams } from './UseTestStreams';
import { useVideoCall } from './VideoCallContext';

export const VideoCallManager: React.FC = () => {

    const { testStreams, loading } = useTestStreams();

    const {
        addParticipant, removeParticipant, setParticipants, state
    } = useVideoCall();

    // Функции для ручного управления
    const handleAddRandomParticipant = () => {
        const randomId = `user-${Date.now()}`;
        const names = ['Олег', 'Светлана', 'Дмитрий', 'Екатерина', 'Алексей'];
        const randomName = names[Math.floor(Math.random() * names.length)];

        addParticipant({
            id: randomId,
            userName: randomName,
            stream: testStreams[Math.random() > 0.3 ? (Math.random() > 0.6 ? 1 : 2) : 0],
            isMuted: false,
            isSpeaking: true,
        });
    };

    const handleRemoveFirstParticipant = () => {
        if (state.participants.length > 0) {
            removeParticipant(state.participants[0].id);
        }
    };

    const handleClearAllParticipants = () => {
        setParticipants([]);
    };

    return (
        <div style={{ height: '100vh', position: 'relative' }}>
            <VideoCallMiniInterface maxRows={2} maxCols={4} />

            <div style={{
                position: 'fixed',
                top: '10px',
                right: '10px',
                background: 'rgba(0,0,0,0.8)',
                padding: '15px',
                borderRadius: '10px',
                color: 'white',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                minWidth: '200px'
            }}>
                <h4 style={{ margin: '0 0 10px 0' }}>Управление участниками</h4>

                <button
                    onClick={handleAddRandomParticipant}
                    style={{
                        padding: '8px 12px',
                        background: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Добавить случайного
                </button>

                {state.participants.length > 0 && (
                    <button
                        onClick={handleRemoveFirstParticipant}
                        style={{
                            padding: '8px 12px',
                            background: '#ff9800',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Удалить первого
                    </button>
                )}

                {state.participants.length > 0 && (
                    <button
                        onClick={handleClearAllParticipants}
                        style={{
                            padding: '8px 12px',
                            background: '#f44336',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Очистить всех ({state.participants.length})
                    </button>
                )}

                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                    Участников: {state.participants.length + 1}
                </div>
            </div>
        </div>
    );
};
