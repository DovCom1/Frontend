import { useState, useEffect, useRef, useCallback } from 'react';

interface UseUserMediaProps {
  video?: boolean | MediaTrackConstraints;
  audio?: boolean | MediaTrackConstraints;
  autoStart?: boolean;
}

interface UseUserMediaReturn {
  stream: MediaStream | null;
  error: string | null;
  isLoading: boolean;
  isCameraOn: boolean;
  isMicrophoneOn: boolean;
  startStream: () => Promise<void>;
  stopStream: () => void;
  toggleCamera: () => Promise<void>;
  toggleMicrophone: () => void;
}

export const useUserMedia = ({
  video = true,
  audio = true,
  autoStart = false
}: UseUserMediaProps = {}): UseUserMediaReturn => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(false);
  
  const streamRef = useRef<MediaStream | null>(null);
  const constraintsRef = useRef({
    video: video || false,
    audio: audio || false
  });

  const startStream = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const userMediaStream = await navigator.mediaDevices.getUserMedia(constraintsRef.current);
      
      streamRef.current = userMediaStream;
      setStream(userMediaStream);
      setIsMicrophoneOn(userMediaStream.getAudioTracks().some(track => track.enabled));
      setIsLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
      setError(errorMessage);
      setIsLoading(false);
    }
  }, []);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
      setStream(null);
      setIsMicrophoneOn(false);
    }
  }, []);

  const toggleCamera = useCallback(async () => {
    if (!streamRef.current) {
      await startStream();
      return;
    }

    const videoTracks = streamRef.current.getVideoTracks();
    
    if (videoTracks.length > 0 && videoTracks[0].readyState === 'live') {
      videoTracks.forEach(track => {
        track.stop();
      });
      videoTracks.forEach(track => {
        streamRef.current!.removeTrack(track);
      });
    } else {
      try {
        const videoStream = await navigator.mediaDevices.getUserMedia({
          video: constraintsRef.current.video,
          audio: false
        });

        const newVideoTracks = videoStream.getVideoTracks();
        newVideoTracks.forEach(track => {
          streamRef.current!.addTrack(track);
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Ошибка включения камеры';
        setError(errorMessage);
      }
    }
    
    setStream(streamRef.current);
  }, [startStream]);

  const toggleMicrophone = useCallback(() => {
    if (!streamRef.current) return;

    const audioTracks = streamRef.current.getAudioTracks();
    if (audioTracks.length > 0) {
      const newMicrophoneState = !audioTracks[0].enabled;
      
      audioTracks.forEach(track => {
        track.enabled = newMicrophoneState;
      });
      
      setIsMicrophoneOn(newMicrophoneState);
    }
  }, []);

  useEffect(() => {
    if (autoStart) {
      startStream();
    }

    return () => {
      stopStream();
    };
  }, [autoStart, startStream, stopStream]);

  const isCameraOn = stream?.getVideoTracks().some(track => track.readyState === 'live') ?? false;

  return {
    stream,
    error,
    isLoading,
    isCameraOn,
    isMicrophoneOn,
    startStream,
    stopStream,
    toggleCamera,
    toggleMicrophone,
  };
};
