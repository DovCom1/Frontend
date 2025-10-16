import { useState, useEffect } from 'react';

export const useVideoState = (stream?: MediaStream | null) => {
  const [hasVideo, setHasVideo] = useState(false);

  useEffect(() => {
    if (!stream) {
      setHasVideo(false);
      return;
    }

    const checkVideoState = () => {
      const videoTracks = stream.getVideoTracks();
      const hasActiveVideo = videoTracks.some(track => 
        track.readyState === 'live' && 
        track.enabled &&
        !track.muted
      );
      setHasVideo(hasActiveVideo);
    };

    checkVideoState();

    const handleTrackChange = () => checkVideoState();

    stream.getVideoTracks().forEach(track => {
      track.addEventListener('ended', handleTrackChange);
      track.addEventListener('mute', handleTrackChange);
      track.addEventListener('unmute', handleTrackChange);
    });

    return () => {
      stream.getVideoTracks().forEach(track => {
        track.removeEventListener('ended', handleTrackChange);
        track.removeEventListener('mute', handleTrackChange);
        track.removeEventListener('unmute', handleTrackChange);
      });
    };
  }, [stream]);

  return hasVideo;
};
