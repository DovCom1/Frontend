import React, { useEffect, useState } from 'react';
import { VideoCallProvider } from '../model/VideoCallContext';
import { VideoCallManager } from '../model/VideoCallManager';
import { userState } from '../../../entities/mainUser/model/UserState';
import { User } from '../../../shared/types/User'; // Ваш тип User

interface VideoCallProps {
    roomId?: string;
}

export const VideoCall: React.FC<VideoCallProps> = ({
    roomId
}) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            try {
                // Пытаемся получить данные пользователя (если они уже есть или загрузить)
                const user = await userState.getUser();
                setCurrentUser(user);
            } catch (e) {
                console.error("Не удалось инициализировать пользователя для звонка", e);
            } finally {
                setLoading(false);
            }
        };
        init();
    }, []);

    if (loading) return <div style={{color: 'white'}}>Подготовка оборудования...</div>;
    if (!currentUser) return <div style={{color: 'white'}}>Ошибка доступа: Пользователь не найден.</div>;

    return (
        <VideoCallProvider
            roomId={roomId!} 
            currentUser={{
                id: currentUser.id,
                userName: currentUser.nickname || "Unknown", // Маппинг полей
                avatarUrl: currentUser.avatarUrl,
                isMuted: false, // Начинаем с включенным микрофоном
                isSpeaking: false,
            }}
        >
            <VideoCallManager />
        </VideoCallProvider>
    );
};