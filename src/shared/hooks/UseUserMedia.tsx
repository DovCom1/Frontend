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
  const [isCameraOn, setIsCameraOn] = useState(false);
  
  const streamRef = useRef<MediaStream | null>(null);
  const constraintsRef = useRef({
    video: video || false,
    audio: audio || false
  });

  const handlePermissionError = useCallback((err: any, deviceType: 'video' | 'audio') => {
    if (err?.name === 'NotAllowedError' || err?.name === 'PermissionDeniedError') {
      if (constraintsRef.current.audio) {
        constraintsRef.current.audio = false;
      }
      if (constraintsRef.current.video) {
        constraintsRef.current.video = false;
      }
      return true;
    }
    return false;
  }, []);

  const startStream = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const userMediaStream = await navigator.mediaDevices.getUserMedia(constraintsRef.current);
      
      streamRef.current = userMediaStream;
      setStream(userMediaStream);
      
      const audioTracks = userMediaStream.getAudioTracks();
      const videoTracks = userMediaStream.getVideoTracks();
      
      setIsMicrophoneOn(audioTracks.some(track => track.enabled));
      setIsCameraOn(videoTracks.length > 0);
      
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      
      if (handlePermissionError(err, 'video') || handlePermissionError(err, 'audio')) {
        setError('Доступ к камере или микрофону запрещен');
      } else {
        const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
        setError(errorMessage);
      }
    }
  }, [handlePermissionError]);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
      setStream(null);
      setIsMicrophoneOn(false);
      setIsCameraOn(false);
    }
  }, []);

  const toggleCamera = useCallback(async () => {
    if (!constraintsRef.current.video) {
      constraintsRef.current.video = true;
    }
    if (!streamRef.current) {
      await startStream();
      return;
    }

    const videoTracks = streamRef.current.getVideoTracks();
    
    if (videoTracks.length > 0) {
      videoTracks.forEach(track => {
        track.stop();
      });
      videoTracks.forEach(track => {
        streamRef.current!.removeTrack(track);
      });
      setIsCameraOn(false);
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
        setIsCameraOn(true);
      } catch (err) {
        console.warn('Failed to enable camera:', err);
        constraintsRef.current.video = false;
      }
    }
    
    setStream(streamRef.current ? new MediaStream(streamRef.current.getTracks()) : null);
  }, [startStream]);

  const toggleMicrophone = useCallback(async () => {
    if (!constraintsRef.current.audio) {
      constraintsRef.current.audio = true;
    }
    if (!streamRef.current) {
      await startStream();
      return;
    }

    const audioTracks = streamRef.current.getAudioTracks();
    if (audioTracks.length > 0) {
      const newMicrophoneState = !audioTracks[0].enabled;
      
      audioTracks.forEach(track => {
        track.enabled = newMicrophoneState;
      });
      
      setIsMicrophoneOn(newMicrophoneState);
    } else {
      try {
        const audioStream = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: constraintsRef.current.audio
        });

        const newAudioTracks = audioStream.getAudioTracks();
        newAudioTracks.forEach(track => {
          streamRef.current!.addTrack(track);
        });
        setIsMicrophoneOn(true);
      } catch (err) {
        console.warn('Failed to enable microphone:', err);
        constraintsRef.current.audio = false;
      }
    }
  }, [startStream]);

  useEffect(() => {
    if (autoStart) {
      startStream();
    }

    return () => {
      stopStream();
    };
  }, [autoStart, startStream, stopStream]);

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
