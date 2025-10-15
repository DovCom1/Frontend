import React from 'react';

interface VideoDisplayProps {
  stream?: MediaStream | null;
  autoPlay?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
  isLoading?: boolean;
  error?: string | null;
  // Новые пропсы для управления размерами
  width?: number | string;
  height?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  aspectRatio?: string; // например "16/9", "4/3", "1/1"
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  maintainAspectRatio?: boolean;
}

export const VideoDisplay: React.FC<VideoDisplayProps> = ({
  stream,
  autoPlay = true,
  muted = true,
  controls = false,
  className = '',
  isLoading = false,
  error = null,
  // Новые пропсы со значениями по умолчанию
  width = '100%',
  height = 'auto',
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,
  aspectRatio,
  objectFit = 'cover',
  maintainAspectRatio = true
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream || null;
    }
  }, [stream]);

  // Стили для видео элемента
  const videoStyle: React.CSSProperties = {
    width,
    height,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    objectFit,
    borderRadius: '8px',
    backgroundColor: '#000',
    aspectRatio: maintainAspectRatio ? aspectRatio : undefined
  };

  // Стили для контейнеров загрузки и ошибки
  const containerStyle: React.CSSProperties = {
    width,
    height: height === 'auto' ? '200px' : height,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center' as const
  };

  if (isLoading) {
    return (
      <div 
        className={`${className} video-loading`} 
        style={{
          ...containerStyle,
          background: '#3E3F46',
        }}
      >
        Загрузка видеопотока...
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className={`${className} video-error`} 
        style={{
          ...containerStyle,
          background: '#E81414',
          padding: '20px',
        }}
      >
        Ошибка: {error}
      </div>
    );
  }

  return (
    <div className={`video-stream ${className}`} style={{ width, maxWidth }}>
      <video
        ref={videoRef}
        autoPlay={autoPlay}
        muted={muted}
        controls={controls}
        style={videoStyle}
      >
        Ваш браузер не поддерживает видео элементы.
      </video>
    </div>
  );
};
