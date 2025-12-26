
import { useState } from "react";
import { roomService } from "../api/RoomService";
import { signalingService } from "../api/SignalingService";
import { SignalingMessageType } from "../api/signaling";

interface UseStartCallReturn {
  startCall: (targetUserId: string, targetUserName: string) => Promise<void>;
  isCalling: boolean;
}

export const useStartCall = (): UseStartCallReturn => {
  const [isCalling, setIsCalling] = useState(false);

  const startCall = async (targetUserId: string, targetUserName: string) => {
    if (isCalling) return;

    // 1. Сразу открываем пустую вкладку, пока мы в контексте события "click".
    // Это предотвращает блокировку попапа браузером.
    const callWindow = window.open("", "_blank");
    
    // Можно добавить лоадер в новую вкладку, чтобы не было просто белого экрана
    if (callWindow) {
        callWindow.document.write("<html><body style='background:#1a1a1a; color:white; display:flex; justify-content:center; alignItems:center; height:100vh; font-family:sans-serif;'>Connecting...</body></html>");
    }

    try {
      setIsCalling(true);

      // 2. Создаем комнату (API запрос)
      const roomName = `Call: ${targetUserName}`;
      const roomInfo = await roomService.createRoom(roomName);
      
      console.log(`✅ Комната создана: ${roomInfo.roomId}`);

      // 3. Отправляем инвайт через SignalR
      await signalingService.send(
        SignalingMessageType.ROOM_INVITE,
        {
          roomInfo: {
            roomId: roomInfo.roomId,
            name: roomInfo.name,
            participants: []
          }
        },
        targetUserId
      );

      // 4. Перенаправляем открытую вкладку на страницу звонка
      if (callWindow) {
        callWindow.location.href = `/call?roomId=${roomInfo.roomId}`;
      }

    } catch (error) {
      console.error("❌ Ошибка при начале звонка:", error);
      
      // Если произошла ошибка, закрываем вкладку, которую открыли зря
      if (callWindow) {
        callWindow.close();
      }
      
      // Тут можно вызвать toast-уведомление об ошибке
      // toast.error("Не удалось начать звонок");
    } finally {
      setIsCalling(false);
    }
  };

  return { startCall, isCalling };
};