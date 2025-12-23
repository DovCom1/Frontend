import { userState } from "../../../../entities/mainUser/model/UserState";
import { MessageEntity } from "../../../../entities/message/messageEntity";
import { messageHistoryApi, sendMessage } from "../api/messages";
import { useCallback, useState } from "react";
import { Chat } from "../../../../entities/chat/model/types/chat";
import { useSignalRStore } from "../../../../shared/api/websocket/model/SignalRStore";

export const useDialog = (selectedChat: Chat) => {
  const [messages, setMessages] = useState<MessageEntity[]>([]);
  const [username, setUsername] = useState("user");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const uploadNewMessage = (
    senderId: string,
    content: string,
    sentAt: string,
  ) => {
    const newMessage: MessageEntity = {
      senderId,
      content,
      sentAt,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const addNotifiactionListener = () => {
    const signalStore = useSignalRStore.getState();
    const unsubscribe = signalStore.subscribe("ReceiveNotification", (response: any) => {
      if(response.chatId === selectedChat.id){
        const newMessage: MessageEntity = {
        senderId: response.SenderId,
        content: response.message,
        sentAt: response.createdAt,
        };
        setMessages((prev) => [...prev, newMessage]);
      }
    });
    return unsubscribe;
  };

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
    uploadNewMessage(userId, text, new Date().toISOString());
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
      await messageHistoryApi.get(selectedChat.id, userId).then((res) => {
        setMessages(res.history.messages.reverse());
        setUsername(res.info.name);
      });
    } catch (e) {
      setError("Chat not selected!");
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    username,
    loading,
    error,
    loadMessages,
    handleWrite,
    addNotifiactionListener,
  };
};
