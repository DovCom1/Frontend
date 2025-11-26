import classes from "./ChatsPage.module.css";
import Dialog from "../../components/chatsPage/dialog/ui/Dialog";
import { ChatsSidebar } from "../../components/chatsPage/chatsSidebar/ui/ChatsSidebar";
import Sidebar from "../../components/chatsPage/Sidebar";
import { useState } from "react";
import { Chat } from "../../entities/chat/model/types/chat";
import { FriendsAndEnemies } from "../../components/friendsAndEnemies/ui/FriendsAndEnemies";

enum MainWindowType {
  Dialog,
  FriendsAndEnemies,
}

function findChatById(chats: Chat[], id: string): Chat | undefined {
  for (const chat of chats) {
    if (chat.id === id) return chat;
  }
  return undefined;
}

const ChatsPage = () => {
  const [selectedChat, setSelectedChat] = useState<Chat>();

  const [mainWindow, setMainWindow] = useState<MainWindowType>(
    MainWindowType.Dialog,
  );

  const closeFriendsAndEnemies = () => {
    setMainWindow(MainWindowType.Dialog);
  };

  const handleChatChange = (chat: Chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className={classes.container}>
      <Sidebar onMainWindowTypeChange={setMainWindow} />
      <ChatsSidebar onChatChange={handleChatChange} />
      {mainWindow === MainWindowType.Dialog && (
        <Dialog selectedChat={selectedChat} />
      )}
      {mainWindow === MainWindowType.FriendsAndEnemies && (
        <FriendsAndEnemies onClose={closeFriendsAndEnemies} />
      )}
    </div>
  );
};

export default ChatsPage;
