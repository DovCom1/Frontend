import { useState, useEffect } from 'react';

interface MediaDevices {
  cameras: MediaDeviceInfo[];
  microphones: MediaDeviceInfo[];
  speakers: MediaDeviceInfo[];
}

export const useMediaDevices = () => {
  const [devices, setDevices] = useState<MediaDevices>({
    cameras: [],
    microphones: [],
    speakers: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateDevices = async () => {
      try {
        const mediaDevices = await navigator.mediaDevices.enumerateDevices();
        
        const cameras = mediaDevices.filter(device => device.kind === 'videoinput');
        const microphones = mediaDevices.filter(device => device.kind === 'audioinput');
        const speakers = mediaDevices.filter(device => device.kind === 'audiooutput');

        setDevices({ cameras, microphones, speakers });
        setIsLoading(false);
      } catch (err) {
        console.error('Ошибка получения устройств:', err);
        setIsLoading(false);
      }
    };

    updateDevices();

    // Слушаем изменения устройств
    navigator.mediaDevices.addEventListener('devicechange', updateDevices);
    
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', updateDevices);
    };
  }, []);

  return { devices, isLoading };
};
