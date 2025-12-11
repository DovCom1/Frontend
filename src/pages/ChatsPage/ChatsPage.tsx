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

enum MainWindowType {
  Dialog,
  FriendsAndEnemies,
}

// function findChatById(chats: Chat[], id: string): Chat | undefined {
//   for (const chat of chats) {
//     if (chat.id === id) return chat;
//   }
//   return undefined;
// }

const ChatsPage = () => {
  const [selectedChat, setSelectedChat] = useState<Chat>();

  const chatsSidebarRef = useRef<ChatsSidebarRef>(null);

  const [mainWindow, setMainWindow] = useState<MainWindowType>(
    MainWindowType.Dialog
  );

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
      // Если у ChatsSidebar есть метод для обновления чатов
      chatsSidebarRef.current.loadChats?.();
    }
  };

  return (
    <div className={classes.container}>
      <Sidebar onMainWindowTypeChange={setMainWindow} />

      <ChatsSidebar ref={chatsSidebarRef} onChatChange={handleChatChange} />

      {mainWindow === MainWindowType.Dialog && (
        <Dialog selectedChat={selectedChat} />
      )}
      {mainWindow === MainWindowType.FriendsAndEnemies && (
        <FriendsAndEnemies
          onClose={closeFriendsAndEnemies}
          onChatCreated={handleChatsUpdate} // Передаем callback
        />
      )}
    </div>
  );
};

export default ChatsPage;
