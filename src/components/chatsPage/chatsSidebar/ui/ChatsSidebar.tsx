import React, { useRef, useState, useCallback } from "react";
import { Chat } from "../../../../entities/chat/model/types/chat";
import { ChatSearch } from "../../../../features/chatSearch/ui/ChatSearch";
import { ChatsList } from "./ChatsList";
import { useChatsSidebar } from "../model/useChatsSidebar";
import "./ChatsSidebar.css";
import Icon from "../../../../shared/atoms/icons/Icon";
import IconButton from "../../../../shared/atoms/buttons/IconButton";

interface ChatsSidebarProps {
  userId: string;
  onChatChange: (chatId: string) => void;
  initialChats: Chat[];
}

export const ChatsSidebar: React.FC<ChatsSidebarProps> = ({
  userId,
  onChatChange,
  initialChats,
}) => {
  const {
    searchTerm,
    filteredChats,
    selectedChatId,
    handleSearchChange,
    handleChatSelect,
  } = useChatsSidebar(initialChats, userId);

  const [sidebarWidth, setSidebarWidth] = useState(340);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleChatSelectWithCallback = (chatId: string) => {
    handleChatSelect(chatId);
    onChatChange(chatId);
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
    [isResizing]
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
        />
      </div>

      <ChatsList
        chats={filteredChats}
        selectedChatId={selectedChatId}
        onChatSelect={handleChatSelectWithCallback}
      />

      {/* Затемнение при изменении размера */}
      {isResizing && <div className="resize-overlay" />}
    </div>
  );
};
