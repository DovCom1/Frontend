import React, { useEffect } from 'react';
import { VideoCallProvider } from '../model/VideoCallContext';
import { VideoCallManager } from '../model/VideoCallManager';

// Главный компонент приложения
export const VideoCall: React.FC = () => {
    return (
        <VideoCallProvider
            currentUser={{
                id: 'current-user',
                userName: 'Developer',
                isMuted: true,
                isSpeaking: false,
            }}
        >
            <VideoCallManager />
        </VideoCallProvider>
    );
};

