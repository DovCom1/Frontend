import React, { useState } from 'react';
import { VideoDisplay } from '../../../shared/atoms/media/VideoDisplay';
import { AudioPlayer } from '../../../shared/atoms/media/AudioPlayer';
import Icon from '../../../shared/atoms/icons/Icon';
import { useVideoState } from '../../../shared/hooks/UseVideoState';
import classes from './VideoChatParticipant.module.css';

interface VideoChatParticipantProps {
  stream?: MediaStream | null;
  userName: string;
  avatarUrl?: string;
  isSpeaking?: boolean;
  isMuted?: boolean;
  className?: string;
  style?: React.CSSProperties;
  videoWidth?: number | string;
  videoHeight?: number | string;
  videoObjectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  avatarSize?: string;
  avatarScale?: boolean;
}

export const VideoChatParticipant: React.FC<VideoChatParticipantProps> = ({
  stream,
  userName,
  avatarUrl,
  isSpeaking = false,    // Показывает активность голоса
  isMuted = false,       // Показывает состояние микрофона
  className = '',
  style = {},
  videoWidth = 300,
  videoHeight = 200,
  videoObjectFit = 'cover',
  avatarSize = '80px',
  avatarScale = true,
}) => {
  const [showVolumeControl, setShowVolumeControl] = useState(false);
    
  const isCameraOn = useVideoState(stream);
  
  const getInitials = (name: string) => {
    return name.split(' ').map(word => word.charAt(0).toUpperCase()).join('').slice(0, 2);
  };


  const handleParticipantClick = () => {
    setShowVolumeControl(prev => !prev);
  };

  return (
    <div 
      className={`${classes.participant} ${className} ${isSpeaking ? classes.speaking : ''} ${isMuted ? classes.muted : ''} ${showVolumeControl ? classes.showingControls : ''}`}
      style={style}
      onClick={handleParticipantClick}
    >
      <div className={classes.mediaContainer}>
        {isCameraOn ? (
          <VideoDisplay
            stream={stream}
            autoPlay={true}
            muted={true}
            controls={false}
            width={videoWidth}
            height={videoHeight}
            objectFit={videoObjectFit}
            className={classes.videoDisplay}
          />
        ) : (
          <div 
            className={classes.avatarContainer}
            style={{ 
              width: videoWidth,
              height: videoHeight,
            }}
          >
            {avatarUrl ? (
              <Icon
                path={avatarUrl}
                size={avatarSize}
                className={classes.avatarIcon}
                scale={avatarScale}
              />
            ) : (
              <div className={classes.avatarInitials}>{getInitials(userName)}</div>
            )}
          </div>
        )}
      </div>

      <div className={classes.userInfo}>
        {/* Показываем иконку выключенного микрофона если пользователь muted */}
        {isMuted && <Icon path="/icons/microOffWhite.svg" className={classes.mutedIndicator} scale={avatarScale} />}
        
        {/* Показываем иконку активного микрофона если пользователь говорит */}
        {isSpeaking && !isMuted && <Icon path="/icons/microWhite.svg" className={classes.speakingIndicator} scale={avatarScale} />}
        
        <span className={classes.userName}>{userName}</span>
      </div>

      {/* AudioPlayer всегда рендерится, но с разными стилями в зависимости от состояния */}
      <div 
        className={classes.audioPlayerOverlay} 
        onClick={(e) => e.stopPropagation()}
        style={{
          pointerEvents: showVolumeControl ? 'auto' : 'none',
          zIndex: showVolumeControl ? 20 : -1,
        }}
      >
        <AudioPlayer
          stream={stream}
          autoPlay={true}
          showControls={showVolumeControl}
          showVolume={showVolumeControl}
          className={classes.audioPlayer}
          style={{
            padding: showVolumeControl ? '15px' : '0',
            borderRadius: showVolumeControl ? '12px' : '0',
            width: showVolumeControl ? '220px' : '0',
            opacity: showVolumeControl ? 1 : 0,
            transition: 'all 0.3s ease',
            visibility: showVolumeControl ? 'visible' : 'hidden',
          }}
        />
      </div>

      {/* Можно раскомментировать если нужно показывать "Нет аудио" */}
      {/* {!hasAudio && (
        <div className={classes.noAudioIndicator}>
          <Icon path="/icons/tabler_volume-off.svg" size="14px" className={classes.noAudioIcon} scale={avatarScale} />
          <span>Нет аудио</span>
        </div>
      )} */}
    </div>
  );
};
