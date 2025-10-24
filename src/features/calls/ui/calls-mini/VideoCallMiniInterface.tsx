import React, { useState, useEffect } from 'react';
import { ParticipantsGrid } from '../ParticipantsGrid';
import { ControlButtons } from './ControlButtons';
import { VideoChatParticipant } from '../VideoChatParticipant';
import { useUserMedia } from '../../../../shared/hooks/UseUserMedia';
import { useVideoCall, Participant } from '../../model/VideoCallContext';
import classes from './VideoCallMiniInterface.module.css';

interface VideoCallMiniInterfaceProps {
    maxRows?: number;
    maxCols?: number;
}

export const VideoCallMiniInterface: React.FC<VideoCallMiniInterfaceProps> = ({
    maxRows = 2,
    maxCols = 3,
}) => {
    const { state, updateCurrentUser, updateParticipant } = useVideoCall();
    
    const {
        stream: userStream,
        isCameraOn,
        isMicrophoneOn,
        toggleCamera,
        toggleMicrophone,
        error
    } = useUserMedia({
        video: false,
        audio: true,
        autoStart: false
    });

    // Состояния для дополнительных функций
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showEmotions, setShowEmotions] = useState(false);

    useEffect(() => {
        updateCurrentUser({
            stream: userStream,
            isMuted: !isMicrophoneOn,
            isSpeaking: isMicrophoneOn
        });
    }, [userStream, isMicrophoneOn, updateCurrentUser]);

    // Создаем элементы VideoChatParticipant для всех участников
    const allParticipants = React.useMemo(() => {
        const userParticipant = (
            <VideoChatParticipant
                key={state.currentUser.id}
                stream={state.currentUser.stream}
                userName={state.currentUser.userName}
                avatarUrl={state.currentUser.avatarUrl}
                isSpeaking={state.currentUser.isSpeaking}
                isMuted={state.currentUser.isMuted}
            />
        );

        const otherParticipants = state.participants.map(participant => (
            <VideoChatParticipant
                key={participant.id}
                stream={participant.stream}
                userName={participant.userName}
                avatarUrl={participant.avatarUrl}
                isSpeaking={participant.isSpeaking}
                isMuted={participant.isMuted}
            />
        ));

        // Текущий пользователь всегда первый в списке
        return [userParticipant, ...otherParticipants];
    }, [state.participants, state.currentUser]);

    // Обработчики для ControlButtons
    const handleToggleCamera = () => {
        toggleCamera();
        updateCurrentUser({ isMuted: !isCameraOn });
    };

    const handleToggleMicrophone = () => {
        toggleMicrophone();
        updateCurrentUser({ 
            isMuted: !isMicrophoneOn,
            isSpeaking: isMicrophoneOn 
        });
    };

    const handleEmotionsClick = () => {
        setShowEmotions(prev => !prev);
    };

    const handleFullscreenClick = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const handleEndCallClick = () => {
        // Логика завершения звонка
        console.log('Завершение звонка...');
        alert("Call ended...");
        // Можно добавить очистку участников
        // setParticipants([]);
        window.close(); // или другая логика
    };

    return (
        <div className={classes.videoCallInterface}>
            {/* Основной контент - грид с участниками */}
            <div className={classes.mainContent}>
                <ParticipantsGrid
                    participants={allParticipants}
                    maxRows={maxRows}
                    maxCols={maxCols}
                />
                
                {/* Блок с эмоциями */}
                {showEmotions && (
                    <div className={classes.emotionsPanel}>
                        <div className={classes.emotion}>👍</div>
                        <div className={classes.emotion}>👎</div>
                        <div className={classes.emotion}>😊</div>
                        <div className={classes.emotion}>🎉</div>
                        <div className={classes.emotion}>🤔</div>
                    </div>
                )}
            </div>

            {/* Панель управления */}
            <div className={classes.controlsContainer}>
                <ControlButtons
                    isCameraOn={isCameraOn}
                    isMicroOn={isMicrophoneOn}
                    onToggleCamera={handleToggleCamera}
                    onToggleMicrophone={handleToggleMicrophone}
                    onEmotionsButtonClick={handleEmotionsClick}
                    onFullscreenClick={handleFullscreenClick}
                    onEndCallClick={handleEndCallClick}
                />
            </div>

            {/* Отображение ошибок */}
            {error && (
                <div className={classes.errorBanner}>
                    {error}
                </div>
            )}
        </div>
    );
};
