import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Chat } from "../../../../entities/chat/model/types/chat";
import { useChatsSidebar } from "../model/useChatsSidebar";
import "./ChatsSidebar.css";
import { UserRepresentation } from "../../UserRepresentation/ui/UserRepresentation";
import NotificationWidget from "../../notificationWidget/ui/NotificationWidget";
import { ChatSearch } from "../../../../features/chatSearch/ui/ChatSearch";
import IconButton from "../../../../shared/atoms/buttons/IconButton";
import Icon from "../../../../shared/atoms/icons/Icon";
import { ChatsList } from "./ChatsList";

interface ChatsSidebarProps {
  onChatChange: (chat: Chat) => void;
}

export interface ChatsSidebarRef {
  showProfile: () => void;
}

enum SidebarView {
  Chats,
  UserProfile,
}

const initialChats = [
  {
    id: "1",
    name: "Мишка Фредди",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma&backgroundColor=ffdfbf",
  },
];

export const ChatsSidebar = forwardRef<ChatsSidebarRef, ChatsSidebarProps>(
  ({ onChatChange }, ref) => {
    const [currentView, setCurrentView] = useState<SidebarView>(
      SidebarView.Chats
    );

    // Предоставляем методы для родительского компонента
    useImperativeHandle(ref, () => ({
      showProfile: () => {
        setCurrentView(SidebarView.UserProfile);
      },
    }));

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
    const [isNotificationsOpen, setNotificationsOpen] = useState(false);
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

          if (newWidth >= 250 && newWidth <= 600) {
            setSidebarWidth(newWidth);
          }
        }
      },
      [isResizing]
    );

    useEffect(() => {
      if (isResizing) {
        document.addEventListener("mousemove", resize);
        document.addEventListener("mouseup", stopResizing);

        return () => {
          document.removeEventListener("mousemove", resize);
          document.removeEventListener("mouseup", stopResizing);
        };
      }
    }, [isResizing, resize, stopResizing]);

    const handleBackToChats = () => {
      setCurrentView(SidebarView.Chats);
    };

    return (
      <div
        ref={sidebarRef}
        className="chats-sidebar"
        style={{ width: `${sidebarWidth}px` }}
      >
        {/* Область для изменения размера */}
        <div
          className={`resize-handle ${
            isResizing ? "resize-handle--active" : ""
          }`}
          onMouseDown={startResizing}
          data-resize-handle
        />

        <div className="chats-sidebar__search">
          {currentView === SidebarView.UserProfile && (
            <IconButton
              icon={
                <Icon path="/icons/arrow-left.svg" height="24px" width="24px" />
              }
              onClick={handleBackToChats}
              className="chats-sidebar__back-button"
            />
          )}
          {currentView === SidebarView.Chats && (
            <>
              <ChatSearch value={searchTerm} onChange={handleSearchChange} />
              <IconButton
                icon={
                  <Icon path="/icons/bell.svg" height="34px" width="55px" />
                }
                onClick={() => setNotificationsOpen(true)}
              />
            </>
          )}
        </div>

        <NotificationWidget
          isOpen={isNotificationsOpen}
          onClose={() => setNotificationsOpen(false)}
        />

        {currentView === SidebarView.Chats ? (
          loading ? (
            <div>Загрузка...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <ChatsList
              chats={filteredChats}
              selectedChat={selectedChat}
              onChatSelect={handleChatSelectWithCallback}
            />
          )
        ) : (
          <UserRepresentation
            onClose={handleBackToChats}
            userId="10000"
          />
        )}

        {/* Затемнение при изменении размера */}
        {isResizing && <div className="resize-overlay" />}
      </div>
    );
  }
);

ChatsSidebar.displayName = "ChatsSidebar";
