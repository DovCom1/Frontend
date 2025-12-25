// pages/ChatsPage.tsx
import classes from "./ChatsPage.module.css";
import Dialog from "../../components/chatsPage/dialog/ui/Dialog";
import {
  ChatsSidebar,
  ChatsSidebarRef,
} from "../../components/chatsPage/chatsSidebar/ui/ChatsSidebar";
import Sidebar from "../../components/chatsPage/Sidebar";
import { useEffect, useRef, useState } from "react";
import { Chat } from "../../entities/chat/model/types/chat";
import { FriendsAndEnemies } from "../../components/friendsAndEnemies/ui/FriendsAndEnemies";
import { userState } from "../../entities/mainUser/model/UserState";
import {
  ChatCreaterWidget,
  useChatCreator,
} from "../../features/chatCreater/ui/CreateChatWidget";

enum MainWindowType {
  Dialog,
  FriendsAndEnemies,
}

const ChatsPage = () => {
  const [selectedChat, setSelectedChat] = useState<Chat>();

  const chatsSidebarRef = useRef<ChatsSidebarRef>(null);

  const [mainWindow, setMainWindow] = useState<MainWindowType>(
    MainWindowType.Dialog
  );

  // Используем хук для управления виджетом создания чата
  const {
    isOpen: isChatCreatorOpen,
    openChatCreator,
    closeChatCreator,
  } = useChatCreator();

  useEffect(() => {
    const showProfileInFriendsSection = async () => {
      if (mainWindow === MainWindowType.FriendsAndEnemies) {
        handleShowProfile(await userState.getUserId());
      }
    };

    showProfileInFriendsSection();
  }, [mainWindow]);

  const closeFriendsAndEnemies = async () => {
    setMainWindow(MainWindowType.Dialog);
  };

  const handleChatChange = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleShowProfile = (userId: string) => {
    chatsSidebarRef.current?.showProfile(userId);
  };

  const handleChatsUpdate = async () => {
    if (chatsSidebarRef.current) {
      chatsSidebarRef.current.loadChats?.();
    }
  };

  // Обработчик успешного создания чата
  const handleChatCreated = () => {
    handleChatsUpdate();
    closeChatCreator();
  };

  return (
    <div className={classes.container}>
      {/* Sidebar с передачей функции для открытия создания чата */}
      <Sidebar
        onMainWindowTypeChange={setMainWindow}
        onOpenChatCreator={openChatCreator} // Передаем функцию открытия
      />

      <ChatsSidebar ref={chatsSidebarRef} onChatChange={handleChatChange} />

      {mainWindow === MainWindowType.Dialog && (
        <Dialog selectedChat={selectedChat} />
      )}
      {mainWindow === MainWindowType.FriendsAndEnemies && (
        <FriendsAndEnemies
          onClose={closeFriendsAndEnemies}
          onChatCreated={handleChatsUpdate}
        />
      )}

      {/* Виджет создания чата */}
      <ChatCreaterWidget
        isOpen={isChatCreatorOpen}
        onClose={closeChatCreator}
        onCreateChat={handleChatCreated}
      />
    </div>
  );
};

export default ChatsPage;
