import React, { useRef, useState, useCallback, useEffect } from "react";
import { Chat } from "../../../../entities/chat/model/types/chat";
import { ChatSearch } from "../../../../features/chatSearch/ui/ChatSearch";
import { ChatsList } from "./ChatsList";
import { useChatsSidebar } from "../model/useChatsSidebar";
import "./ChatsSidebar.css";
import Icon from "../../../../shared/atoms/icons/Icon";
import IconButton from "../../../../shared/atoms/buttons/IconButton";
import NotificationWidget from "../../notificationWidget/ui/NotificationWidget";
import { userState } from "../../../../entities/mainUser/model/UserState";

interface ChatsSidebarProps {
  onChatChange: (chat: Chat) => void;
}

const initialChats = [
  {
    id: "1",
    name: "Мишка Фредди",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma&backgroundColor=ffdfbf",
  },
];

export const ChatsSidebar: React.FC<ChatsSidebarProps> = ({ onChatChange }) => {
  useEffect(() => {
    loadChats();
  }, []);

  const {
    searchTerm,
    filteredChats,
    selectedChat,
    error,
    loading,
    loadChats,
    handleSearchChange,
    handleChatSelect,
  } = useChatsSidebar(initialChats);

  const [sidebarWidth, setSidebarWidth] = useState(340);
  const [isResizing, setIsResizing] = useState(false);
  const [isNotifiacationsOpen, setNotifiacationsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleChatSelectWithCallback = (chat: Chat) => {
    handleChatSelect(chat);
    onChatChange(chat);
  };

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing && sidebarRef.current) {
        const rect = sidebarRef.current.getBoundingClientRect();
        const newWidth = e.clientX - rect.left;

        // Ограничиваем минимальную и максимальную ширину
        if (newWidth >= 250 && newWidth <= 600) {
          setSidebarWidth(newWidth);
        }
      }
    },
    [isResizing],
  );

  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", resize);
      document.addEventListener("mouseup", stopResizing);

      return () => {
        document.removeEventListener("mousemove", resize);
        document.removeEventListener("mouseup", stopResizing);
      };
    }
  }, [isResizing, resize, stopResizing]);

  return (
    <div
      ref={sidebarRef}
      className="chats-sidebar"
      style={{ width: `${sidebarWidth}px` }}
    >
      {/* Область для изменения размера */}
      <div
        className={`resize-handle ${isResizing ? "resize-handle--active" : ""}`}
        onMouseDown={startResizing}
        data-resize-handle
      />

      <div className="chats-sidebar__search">
        <ChatSearch value={searchTerm} onChange={handleSearchChange} />
        <IconButton
          icon={
            <Icon path={"/icons/bell.svg"} height="34px" width="55px"></Icon>
          }
          onClick={() => setNotifiacationsOpen(true)}
        />
      </div>
      <NotificationWidget
        isOpen={isNotifiacationsOpen}
        onClose={() => setNotifiacationsOpen(false)}
      />
      {loading ? (
        <div>Загрузка...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ChatsList
          chats={filteredChats}
          selectedChat={selectedChat}
          onChatSelect={handleChatSelectWithCallback}
        />
      )}

      {/* Затемнение при изменении размера */}
      {isResizing && <div className="resize-overlay" />}
    </div>
  );
};
