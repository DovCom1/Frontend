import { useEffect, useState } from "react";
import { Chat } from "../../../../entities/chat/model/types/chat";
import { useChatSearch } from "../../../../features/chatSearch/model/UseChatSearch";
import { getChatsApi } from "../api/GetChatsApi";

export const useChatsSidebar = (initialChats: Chat[], userId: string) => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);

  const getChats = async () => {
    try {
      const chatsResponse = await getChatsApi.get(userId);
      setChats(chatsResponse.chats);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getChats();
  }, [userId]);

  const { searchTerm, filteredChats, handleSearchChange } = useChatSearch(
    initialChats || chats,
  );

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  return {
    searchTerm,
    filteredChats,
    selectedChatId,
    handleSearchChange,
    handleChatSelect,
  };
};
