import { useEffect, useState } from "react";
import { useWebSocketStore } from "../../../shared/api/websocket/model/websocketStore";

export const useChat = (chatId: string) => {
  const { subscribe, isConnected } = useWebSocketStore();
  //массив сообщений который и будет меняться
  const [messages, setMessages] = useState([]);

  //ещё один useEffect он нужен будет чтобы сразы получить 20 первых сообщений в чате по rest API
  useEffect(() => {
    // baseApi.post("/chats/${chatId}/messages")
    // baseApi.post("/chats/${chatId}/messages")
  });

  useEffect(() => {
    if (!isConnected) return;

    const unsubscribe = subscribe(`chat:${chatId}`, (message: any) => {
      //это как раз сообщение через вебсокет
    });

    return unsubscribe;
  }, [isConnected, chatId, subscribe]);

  const sendMessage = (content: string) => {
    //тут будет rest API post запрос
    //baseApi.get("/chats/${chatId}/messages")
  };

  //тут понадобится указать диапозонон сообщениё для получения. Тоже через rest API
  const getMessages = (content: []) => {
    //тут будет rest API get запрос
  };

  return { messages, sendMessage, getMessages };
};
