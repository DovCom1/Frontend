import React, { useState } from "react";
import Button from "../../shared/atoms/buttons/Button";
import Label from "../../shared/atoms/labels/Label";
import { Modal } from "../../shared/atoms/modal/Modal";
import { MeetingScheduler } from "../../features/meeting_sheduler/MeetingScheduler";
import buttonClasses from "../../shared/atoms/buttons/Button.module.css";
import classes from "./CallTestPage.module.css";
import { TextInput } from "../../shared/atoms/input-fields/TextInput";
import { VideoCall } from "../../features/calls/ui/VideoCall";
import { VideoChatParticipant } from "../../features/calls/ui/VideoChatParticipant";

// Импортируем наш сервис
import { roomService } from "../../features/calls/api/RoomService"; // Убедись, что путь верный

export const CallTestPage: React.FC = () => {
  // --- States для существующих тестов ---
  const [meetingTitle, setMeetingTitle] = useState("");
  const [participants, setParticipants] = useState("");
  const [email, setEmail] = useState("");
  const [textValue, setTextValue] = useState("");
  const [password, setPassword] = useState("");
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [isSimpleModalOpen, setIsSimpleModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  // --- 🔥 LOGIC: WebRTC Testing ---
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null); // Если ID есть, значит звонок идет
  const [manualRoomId, setManualRoomId] = useState(""); // Для инпута "Присоединиться"
  const [isLoadingRoom, setIsLoadingRoom] = useState(false);

  // 1. Создать новую комнату и войти
  const handleCreateRoom = async () => {
    try {
      setIsLoadingRoom(true);
      const room = await roomService.createRoom("Test Room " + new Date().toLocaleTimeString());
      console.log("Created Room:", room.roomId);
      setActiveRoomId(room.roomId); // Включаем режим звонка
    } catch (e) {
      alert("Ошибка при создании комнаты");
      console.error(e);
    } finally {
      setIsLoadingRoom(false);
    }
  };

  // 2. Войти в существующую по ID
  const handleJoinRoom = () => {
    if (!manualRoomId) return;
    setActiveRoomId(manualRoomId); // Просто прокидываем ID в компонент
  };

  // 3. Выйти (сбросить тест)
  const handleLeaveRoom = () => {
    setActiveRoomId(null);
    // Тут можно добавить логику roomService.leaveRoom() если есть
  };

  return (
    <div className={classes.testPage}>
      <header className={classes.header}>
        <h1>🧪 Страница тестирования звонков</h1>
        <p>Здесь мы тестируем все наши новые компоненты</p>
      </header>

      <div className={classes.content}>
        
        {/* 🔥 Секция тестирования звонков - Вынес в самый верх для удобства */}
        <section className={classes.section} style={{ border: "2px solid #3b82f6", background: "#f0f9ff" }}>
          <h2>📞 Тест Видеосвязи (Manual Mode)</h2>
          
          {!activeRoomId ? (
            // РЕЖИМ НАСТРОЙКИ (Вход)
            <div className={classes.componentsGrid}>
              
              {/* Блок А: Создать новую */}
              <div style={{ padding: 20, background: "white", borderRadius: 12 }}>
                <h3>Создать комнату (Host)</h3>
                <p style={{marginBottom: 10, fontSize: 14, color: '#666'}}>Создаст новую сессию на бэкенде и подключится.</p>
                <Button
                  className={buttonClasses.defaultButtonBlue}
                  label={<Label text={isLoadingRoom ? "Создание..." : "Создать и войти"} />}
                  onClick={handleCreateRoom}
                  disabled={isLoadingRoom}
                />
              </div>

              {/* Блок Б: Присоединиться */}
              <div style={{ padding: 20, background: "white", borderRadius: 12 }}>
                <h3>Присоединиться (Peer)</h3>
                <p style={{marginBottom: 10, fontSize: 14, color: '#666'}}>Вставьте UUID комнаты, который вам скинул Host.</p>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
                  <TextInput
                    label="Room ID (UUID)"
                    placeholder="xxxxxxxx-xxxx-..."
                    value={manualRoomId}
                    onChange={setManualRoomId}
                  />
                  <Button
                    className={buttonClasses.defaultButtonOrange}
                    label={<Label text="Войти" />}
                    onClick={handleJoinRoom}
                    disabled={!manualRoomId}
                  />
                </div>
              </div>

            </div>
          ) : (
            // РЕЖИМ АКТИВНОГО ЗВОНКА
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>Active Room ID:</strong> <span style={{fontFamily: 'monospace'}}>{activeRoomId}</span>
                  </div>
                  <Button
                    className={buttonClasses.defaultWarningButton}
                    label={<Label text="Завершить тест" />}
                    onClick={handleLeaveRoom}
                  />
               </div>

               {/* ❗ ВАЖНО: Предполагается, что VideoCall теперь принимает roomId.
                  Если он берет его из URL, нам нужно будет или менять VideoCall, 
                  или фейкать URL, но лучше прокинуть пропс.
               */}
               <div style={{ border: "1px solid #ccc", height: "600px", borderRadius: "12px", overflow: "hidden" }}>
                  <VideoCall roomId={activeRoomId} />
               </div>
            </div>
          )}
        </section>

      </div>

    </div>
  );
};

export default CallTestPage;