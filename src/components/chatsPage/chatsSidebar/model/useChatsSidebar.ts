import { useState } from "react";
import { Chat } from "../../../../entities/chat/model/types/chat";
import { useChatSearch } from "../../../../features/chatSearch/model/UseChatSearch";

export const useChatsSidebar = (initialChats: Chat[]) => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const { searchTerm, filteredChats, handleSearchChange } =
    useChatSearch(initialChats);

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
