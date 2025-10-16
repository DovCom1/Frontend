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

const isAudioMuted = (st?: MediaStream | null) => {
    return st && st.getAudioTracks().length > 0 && st.getAudioTracks().some(track => track.enabled && !track.muted);
};

export const VideoChatParticipant: React.FC<VideoChatParticipantProps> = ({
  stream,
  userName,
  avatarUrl,
  isSpeaking = false,
  isMuted = false,
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
  
  const hasAudio = isAudioMuted(stream);

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word.charAt(0).toUpperCase()).join('').slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  const handleParticipantClick = () => {
    if (hasAudio) setShowVolumeControl(prev => !prev);
  };

  return (
    <div 
      className={`${classes.participant} ${className} ${isSpeaking ? classes.speaking : ''} ${isMuted ? classes.muted : ''}`}
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
              backgroundColor: avatarUrl ? 'transparent' : getAvatarColor(userName)
            }}
          >
            {avatarUrl ? (
              <Icon
                path={avatarUrl}
                size={avatarSize}
                className={classes.avatarIcon}
                scale={avatarScale}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
              />
            ) : (
              <div className={classes.avatarInitials}>{getInitials(userName)}</div>
            )}
          </div>
        )}
      </div>

      <div className={classes.userInfo}>
        <span className={classes.userName}>{userName}</span>
        {isMuted && <Icon path="🔇" size="16px" className={classes.mutedIndicator} scale={avatarScale} />}
        {isSpeaking && <Icon path="🎤" size="16px" className={classes.speakingIndicator} scale={avatarScale} />}
      </div>

      {(
        <div className={classes.audioPlayerOverlay} onClick={(e) => e.stopPropagation()}>
          <AudioPlayer
            stream={stream}
            autoPlay={true}
            showControls={showVolumeControl}
            showVolume={showVolumeControl}
            className={classes.audioPlayer}
            style={{
              background: 'rgba(0, 0, 0, 0)',
              padding: '15px',
              borderRadius: '12px',
              width: '220px',
              backdropFilter: 'blur(10px)',
              visibility: showVolumeControl ? 'visible' : 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          />
        </div>
      )}

      {!hasAudio && (
        <div className={classes.noAudioIndicator}>
          <Icon path="🔇" size="14px" className={classes.noAudioIcon} scale={avatarScale} />
          <span>Нет аудио</span>
        </div>
      )}
    </div>
  );
};
