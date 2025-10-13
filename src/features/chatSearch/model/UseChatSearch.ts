import { useState, useMemo } from "react";
import { Chat } from "../../../entities/chat/model/types/chat";

export const useChatSearch = (chats: Chat[]) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChats = useMemo(() => {
    if (!searchTerm.trim()) {
      return chats;
    }

    const lowercasedSearch = searchTerm.toLowerCase();
    return chats.filter((chat) =>
      chat.name.toLowerCase().includes(lowercasedSearch)
    );
  }, [chats, searchTerm]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  return {
    searchTerm,
    filteredChats,
    handleSearchChange,
  };
};
