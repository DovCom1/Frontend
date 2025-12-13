import { userState } from "../../../../entities/mainUser/model/UserState";
import { MessageEntity } from "../../../../entities/message/messageEntity";
import { messageHistoryApi, sendMessage } from "../api/messages";
import { useState } from "react";
import { Chat } from "../../../../entities/chat/model/types/chat";
import { members } from "../api/chat";

export const useDialog = (selectedChat: Chat) => {
  const [messages, setMessages] = useState<MessageEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      await userState.getUserId().then(getMessages);
    } catch (e) {
      console.error(e);
      setError("Error while loading messages");
    } finally {
      setLoading(false);
    }
  };

  const handleWrite = async (text: string) => {
    const userId = await userState.getUserId();
    if (!userId) {
      console.log("No user Id!");
      return;
    }
    // создаём новое сообщение
    const newMessage: MessageEntity = {
      senderId: userId,
      content: text,
    };
    setMessages((prev) => [...prev, newMessage]);
    // Запрос сервера на поиск айди
    if (selectedChat) {
      sendMessage.post(userId, selectedChat.id, text, undefined);
    }
  };

  const getMessages = async () => {
    const userId = await userState.getUserId();
    if (!userId) {
      setError("User id is null!");
      return;
    }
    if (!selectedChat) {
      setError("Chat not selected!");
      return;
    }

    try {
      await messageHistoryApi
        .get(selectedChat.id, userId)
        .then((res) => setMessages(res.history.messages));
      console.log("res messages");
    } catch (e) {
      setError("Chat not selected!");
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, error, loadMessages, handleWrite };
};
