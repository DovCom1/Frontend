import classes from "../styles/MessagesField.module.css";
import Message from "../../../../../shared/molecules/Message";
import { DialogProps } from "../Dialog";
import React, { useEffect, useRef, useState } from "react";
import { MessageEntity } from "../../../../../entities/message/messageEntity";
import { userState } from "../../../../../entities/mainUser/model/UserState";
import { scrollMessages } from "../../model/messageField";

interface MessagesFieldProps extends DialogProps {
  messages: MessageEntity[];
  username?: string;
}

// TODO: Добавить логику для проверки источника сообщения

const MessagesField: React.FC<MessagesFieldProps> = ({
  selectedChat,
  messages,
  username,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selfId, setSelfId] = useState<string | null>(null);
  useEffect(() => {
    const fetchUserId = async () => {
      const id = await userState.getUserId();
      setSelfId(id);
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    // При первой загрузке
    scrollMessages(containerRef, true);
  }, []);

  useEffect(() => {
    scrollMessages(containerRef, true);
  }, [messages]);

  return (
    <div className={classes.container} ref={containerRef}>
      <div className={classes.messagesInner}>
        {messages.map((m, i) => {
          const formatTime = (dateString: any) => {
            if (!dateString) return "--:--";

            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "--:--";

            // Получаем часы и минуты
            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");
            return `${hours}:${minutes}`;
          };

          return (
            <Message
              name={m.senderId !== selfId ? username : "Me"}
              key={i}
              text={m.content}
              date={formatTime(m.sentAt)}
              from={m.senderId !== selfId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MessagesField;
