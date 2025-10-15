import React from 'react';
import { useAudioStream } from '../../hooks/UseAudioStream';
import classes from './AudioPlayer.module.css';

interface AudioPlayerProps {
  stream?: MediaStream | null;
  autoPlay?: boolean;
  showControls?: boolean;
  showVolume?: boolean;
  className?: string;
  style?: React.CSSProperties; // Добавляем пропс для инлайн-стилей
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  stream,
  autoPlay = true,
  showControls = true,
  showVolume = true,
  className = '',
  style = {}
}) => {
  const {
    isPlaying,
    volume,
    setVolume,
    error
  } = useAudioStream({
    stream,
    autoPlay
  });

  if (error) {
    return (
      <div 
        className={`${classes.audioPlayer} ${classes.error} ${className}`}
        style={style}
      >
        <div className={classes.errorMessage}>
          <span>🔇</span>
          <p>Ошибка аудио: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`${classes.audioPlayer} ${className}`}
      style={style}
    >
      <div className={classes.audioVisualizer}>
        <div 
          className={`${classes.visualizerBar} ${isPlaying ? classes.playing : ''}`}
          style={{ height: `${volume * 100}%` }}
        />
        <div 
          className={`${classes.visualizerBar} ${isPlaying ? classes.playing : ''}`}
          style={{ height: `${volume * 80}%` }}
        />
        <div 
          className={`${classes.visualizerBar} ${isPlaying ? classes.playing : ''}`}
          style={{ height: `${volume * 60}%` }}
        />
        <div 
          className={`${classes.visualizerBar} ${isPlaying ? classes.playing : ''}`}
          style={{ height: `${volume * 40}%` }}
        />
      </div>

      {showControls && showVolume && (
        <div className={classes.controls}>
          <div className={classes.volumeControl}>
            <span className={classes.volumeIcon}>🔊</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className={classes.volumeSlider}
              disabled={!stream}
            />
            <span className={classes.volumeValue}>
              {Math.round(volume * 100)}%
            </span>
          </div>

          <div className={classes.status}>
            {!stream ? 'Нет потока' : isPlaying ? 'Воспроизведение' : 'Пауза'}
          </div>
        </div>
      )}
    </div>
  );
};
