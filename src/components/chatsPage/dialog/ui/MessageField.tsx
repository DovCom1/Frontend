import classes from "./MessagesField.module.css";
import Message from "./Message";
import { DialogProps } from "./Dialog";
import React, { useEffect, useRef } from "react";
import { MessageEntity } from "../../../../entities/message/messageEntity";

interface MessagesFieldProps extends DialogProps {
  messages: MessageEntity[];
}

const MessagesField: React.FC<MessagesFieldProps> = ({
  selectedChat,
  messages,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const NEAR_BOTTOM_THRESHOLD = 100; // px — можно тонко настроить

    if (distanceFromBottom <= NEAR_BOTTOM_THRESHOLD) {
      // пользователь был близко к низу — прокручиваем
      el.scrollTo({ top: el.scrollHeight, behavior: "auto" });
    }
    // иначе — не трогаем (пользователь просматривает историю)
  }, [messages.length]);

  return (
    <div className={classes.container} ref={containerRef}>
      <div className={classes.messagesInner}>
        <Message
          text={selectedChat?.lastMessage || "Привет, мир!"}
          date={"3:33"}
          name={selectedChat?.name || "Мегабро"}
          from
        />

        <Message
          text={"Кто вы такие? Почему вы мне все пишете?"}
          date={"3:34"}
          name={"Me"}
        />
        <Message
          text={"Голуби не то, чем кажутся"}
          date={"6:66"}
          name={selectedChat?.name || "Мегабро"}
          from
        />
        {messages.map((m, i) => (
          <Message
            key={i}
            text={m.text}
            date={m.date}
            name={m.name}
            from={m.from}
          />
        ))}
      </div>
    </div>
  );
};

export default MessagesField;
