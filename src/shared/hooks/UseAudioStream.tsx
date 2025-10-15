import { useState, useEffect, useRef } from 'react';

interface UseAudioStreamProps {
  stream?: MediaStream | null;
  volume?: number;
  autoPlay?: boolean;
}

interface UseAudioStreamReturn {
  isPlaying: boolean;
  volume: number;
  play: () => void;
  pause: () => void;
  setVolume: (volume: number) => void;
  error: string | null;
}

export const useAudioStream = ({
  stream,
  volume = 1,
  autoPlay = true
}: UseAudioStreamProps): UseAudioStreamReturn => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(volume);
  const [error, setError] = useState<string | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (!stream) return;

    const initializeAudio = async () => {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        sourceNodeRef.current = audioContextRef.current.createMediaStreamSource(stream);
        
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.gain.value = currentVolume;
        
        sourceNodeRef.current.connect(gainNodeRef.current);
        gainNodeRef.current.connect(audioContextRef.current.destination);
        
        setError(null);
        
        if (autoPlay && audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }
        
        setIsPlaying(true);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Ошибка инициализации аудио';
        setError(errorMessage);
      }
    };

    initializeAudio();

    return () => {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.disconnect();
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      setIsPlaying(false);
    };
  }, [stream, autoPlay]);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = currentVolume;
    }
  }, [currentVolume]);

  const play = async () => {
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audioContextRef.current && audioContextRef.current.state === 'running') {
      audioContextRef.current.suspend();
      setIsPlaying(false);
    }
  };

  const setVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setCurrentVolume(clampedVolume);
  };

  return {
    isPlaying,
    volume: currentVolume,
    play,
    pause,
    setVolume,
    error
  };
};
