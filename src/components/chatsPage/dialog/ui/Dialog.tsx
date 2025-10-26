import classes from "./Dialog.module.css";
import DialogHeader from "./DialogHeader";
import MessagesField from "./MessageField";
import MessageInput from "./MessageInput";
import { Chat } from "../../../../entities/chat/model/types/chat";
import { useState } from "react";
import { MessageEntity } from "../../../../entities/message/messageEntity";
import { messageHistoryApi, sendMessage } from "../api/messages";

export interface DialogProps {
  selectedChat?: Chat;
}

const Dialog: React.FC<DialogProps> = ({ selectedChat }) => {
  const [messages, setMessages] = useState<MessageEntity[]>([]);

  // Получение истории чатов с сервера
  // if (selectedChat) {
  //   messageHistoryApi
  //     .get(selectedChat.chatId)
  //     .then((res) => setMessages(res.messages))
  // }

  const handleWrite = (text: string) => {
    // создаём новое сообщение
    const newMessage: MessageEntity = {
      text,
      date: "3:34",
      name: "Me",
      from: false, // false — исходящее сообщение (справа)
    };
    setMessages((prev) => [...prev, newMessage]);
    // Запрос серверу, что сообщение отправлено
    // if (selectedChat) {
    //   sendMessage.post(selectedChat?.chatId, selectedChat?.uuid, text);
    // }
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
