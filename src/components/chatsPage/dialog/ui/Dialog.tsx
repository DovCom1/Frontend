import classes from "./Dialog.module.css";
import DialogHeader from "./DialogHeader";
import MessagesField from "./MessageField";
import MessageInput from "./MessageInput";
import { Chat } from "../../../../entities/chat/model/types/chat";
import { useEffect, useState } from "react";
import { MessageEntity } from "../../../../entities/message/messageEntity";
import { messageHistoryApi, sendMessage } from "../api/messages";

// import { userState } from "../../../entities/mainUser/model/UserState";

export interface DialogProps {
  selectedChat?: Chat;
}

const Dialog: React.FC<DialogProps> = ({ selectedChat }) => {
  const [messages, setMessages] = useState<MessageEntity[]>([]);

  // Получение истории чатов с сервера
  const getMessages = async () => {
    if (selectedChat) {
      try {
        await messageHistoryApi
          .get(selectedChat.id)
          .then((res) => setMessages(res.messages));
      } catch (e) {
        setMessages([
          {
            content: "error while get history",
            date: "4:04",
            name: "SERVER",
            from: true,
          },
        ]);
      }
    }
  };
  useEffect(() => {
    getMessages();
  }, [selectedChat]);

  const handleWrite = (text: string) => {
    // создаём новое сообщение
    const newMessage: MessageEntity = {
      content: text,
      date: "3:34",
      name: "Me",
      from: false,
    };
    setMessages((prev) => [...prev, newMessage]);
    // Запрос серверу, что сообщение отправлено
    if (selectedChat) {
      sendMessage.post(selectedChat?.id, text);
    }
  };

  return (
    <div className={classes.container}>
      <DialogHeader selectedChat={selectedChat} />
      <MessagesField selectedChat={selectedChat} messages={messages} />
      <MessageInput onWrite={handleWrite} />
    </div>
  );
};

export default Dialog;
