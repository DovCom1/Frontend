import React from 'react';

interface MediaControlsProps {
  stream: MediaStream | null;
  isLoading: boolean;
  isCameraOn: boolean;
  isMicrophoneOn: boolean;
  onStartStream: () => void;
  onStopStream: () => void;
  onToggleCamera: () => void;
  onToggleMicrophone: () => void;
}

export const MediaControls: React.FC<MediaControlsProps> = ({
  stream,
  isLoading,
  isCameraOn,
  isMicrophoneOn,
  onStartStream,
  onStopStream,
  onToggleCamera,
  onToggleMicrophone,
}) => {
  return (
    <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      {!stream ? (
        <button onClick={onStartStream} disabled={isLoading}>
          {isLoading ? 'Загрузка...' : '🎥 Запустить камеру и микрофон'}
        </button>
      ) : (
        <>
          <button onClick={onStopStream}>⏹️ Полностью остановить</button>
          <button onClick={onToggleCamera}>
            {isCameraOn ? '📵 Выключить камеру' : '📷 Включить камеру'}
          </button>
          <button onClick={onToggleMicrophone}>
            {isMicrophoneOn ? '🔇 Выключить микрофон' : '🎤 Включить микрофон'}
          </button>
        </>
      )}
    </div>
  );
};
