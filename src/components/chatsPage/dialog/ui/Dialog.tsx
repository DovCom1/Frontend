import classes from "./Dialog.module.css";
import DialogHeader from "./DialogHeader";
import MessagesField from "./MessageField";
import MessageInput from "./MessageInput";
import { Chat } from "../../../../entities/chat/model/types/chat";
import { useEffect, useState } from "react";
import { MessageEntity } from "../../../../entities/message/messageEntity";
import { messageHistoryApi, sendMessage } from "../api/messages";
import { userState } from "../../../../entities/mainUser/model/UserState";

// import { userState } from "../../../entities/mainUser/model/UserState";

export interface DialogProps {
  selectedChat?: Chat;
}

const Dialog: React.FC<DialogProps> = ({ selectedChat }) => {
  const [messages, setMessages] = useState<MessageEntity[]>([]);
  const [selfId, setSelfId] = useState<string>("1");

  const getMyId = async () => {
    const res = await userState.getUserId();
    setSelfId(res);
  };
  useEffect(() => {
    getMyId();
  }, []);

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
            // id сообщение присвоится после ответа сервера
            id: "1",
            senderId: selfId,
            content: "error while get history",
            sentAt: "4:04",
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
      id: "1",
      senderId: "1",
      content: text,
      sentAt: "3:34",
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
