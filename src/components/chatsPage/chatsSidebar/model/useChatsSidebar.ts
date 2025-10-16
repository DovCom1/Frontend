import { useState } from "react";
import { Chat } from "../../../../entities/chat/model/types/chat";
import { useChatSearch } from "../../../../features/chatSearch/model/UseChatSearch";
import { getChatsApi } from "../api/GetChatsApi";

export const useChatsSidebar = (initialChats: Chat[], userId: string) => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const { searchTerm, filteredChats, handleSearchChange } = useChatSearch(
    initialChats || getChatsApi.get(userId)
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
