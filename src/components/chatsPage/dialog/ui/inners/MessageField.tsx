import classes from "../styles/MessagesField.module.css";
import Message from "../../../../../shared/molecules/Message";
import { DialogProps } from "../Dialog";
import React, { useEffect, useRef, useState } from "react";
import { MessageEntity } from "../../../../../entities/message/messageEntity";
import { userState } from "../../../../../entities/mainUser/model/UserState";
import { scrollMessages } from "../../model/messageField";

interface MessagesFieldProps extends DialogProps {
  messages: MessageEntity[];
}

// TODO: Добавить логику для проверки источника сообщения

const MessagesField: React.FC<MessagesFieldProps> = ({
  selectedChat,
  messages,
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
    scrollMessages(containerRef);
  }, [messages]);

  return (
    <div className={classes.container} ref={containerRef}>
      <div className={classes.messagesInner}>
        {messages.map((m, i) => (
          <Message
            key={i}
            text={m.content}
            date={m.sentAt}
            // name={selfUser?.nickname}
            from={m.senderId !== selfId}
          />
        ))}
      </div>
    </div>
  );
};

export default MessagesField;
