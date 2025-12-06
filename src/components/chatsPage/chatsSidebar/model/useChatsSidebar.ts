import { useState } from "react";
import { Chat } from "../../../../entities/chat/model/types/chat";
import { useChatSearch } from "../../../../features/chatSearch/model/UseChatSearch";
import { getChatsApi } from "../api/GetChatsApi";
import { userState } from "../../../../entities/mainUser/model/UserState";

export const useChatsSidebar = (initialChats: Chat[]) => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadChats = async () => {
    setLoading(true);
    setError(null);
    try {
      await userState.getUserId().then(getChats);
    } catch (e) {
      setError("Error loading chats!");
    } finally {
      setLoading(false);
    }
  };

  const getChats = async () => {
    try {
      const userId = await userState.getUserId();
      if (!userId) {
        setError("User id is null!");
        return;
      }
      const chatsResponse = await getChatsApi.get(userId);
      setChats(chatsResponse.chats);
    } catch (e) {
      console.error(e);
      setError("Error while getting server response");
    } finally {
      setLoading(false);
    }
  };

  const { searchTerm, filteredChats, handleSearchChange } = useChatSearch(
    initialChats || chats,
  );

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
  };

  return {
    searchTerm,
    filteredChats,
    selectedChat,
    loading,
    error,
    loadChats,
    handleSearchChange,
    handleChatSelect,
  };
};
