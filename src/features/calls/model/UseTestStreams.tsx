import { useState, useEffect } from 'react';

export const useTestStreams = () => {
    const [testStreams, setTestStreams] = useState<MediaStream[]>([]);
    const [loading, setLoading] = useState(false);

    const generateAudioTrack = (frequency: number, type: OscillatorType = 'sine'): MediaStreamTrack => {
        const audioContext = new AudioContext();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const destination = audioContext.createMediaStreamDestination();
        
        oscillator.connect(gainNode);
        gainNode.connect(destination);
        
        oscillator.type = type;
        oscillator.frequency.value = frequency;
        // gainNode.gain.value = 0.05; // Тихая громкость чтобы не мешало
        
        oscillator.start();
        
        return destination.stream.getAudioTracks()[0];
    };

    const getTestVideoStream = async (url: string, audioFrequency: number): Promise<MediaStream> => {
        const video = document.createElement('video');
        video.crossOrigin = 'anonymous';
        video.loop = true;
        video.muted = true; // Должно быть true для автовоспроизведения
        video.playsInline = true;
        
        return new Promise((resolve, reject) => {
            video.src = url;
            video.onloadeddata = async () => {
                try {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d')!;
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;

                    // Создаем комбинированный поток
                    const combinedStream = new MediaStream();
                    
                    // Добавляем видео с canvas
                    const videoStream = canvas.captureStream(25);
                    videoStream.getVideoTracks().forEach(track => {
                        combinedStream.addTrack(track);
                    });
                    
                    // Добавляем сгенерированное аудио
                    const audioTrack = generateAudioTrack(audioFrequency);
                    combinedStream.addTrack(audioTrack);
                    
                    // Анимация отрисовки кадров
                    const drawFrame = () => {
                        if (video.readyState >= video.HAVE_CURRENT_DATA) {
                            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                        }
                        requestAnimationFrame(drawFrame);
                    };
                    
                    // Пробуем воспроизвести видео (muted, так что должно работать)
                    video.play().catch(error => {
                        console.log('Video autoplay blocked, but canvas will work:', error);
                    });
                    
                    drawFrame();
                    resolve(combinedStream);
                } catch (error) {
                    reject(error);
                }
            };
            video.onerror = reject;
        });
    };

    const loadTestStreams = async () => {
        setLoading(true);
        try {
            const testConfigs = [
                { 
                    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                    audioFreq: 392 // Ля
                },
                { 
                    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                    audioFreq: 261 // До
                },
                { 
                    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                    audioFreq: 329 // Ми
                }
            ];

            const streams: MediaStream[] = [];
            
            // Загружаем последовательно чтобы избежать перегрузки
            for (const config of testConfigs) {
                try {
                    const stream = await getTestVideoStream(config.url, config.audioFreq);
                    streams.push(stream);
                    // Небольшая задержка между загрузками
                    await new Promise(resolve => setTimeout(resolve, 500));
                } catch (error) {
                    console.warn(`Failed to load stream from ${config.url}:`, error);
                }
            }
            
            setTestStreams(streams);
        } catch (error) {
            console.error('Error loading test streams:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTestStreams();
    }, []);

    return { testStreams, loading };
};