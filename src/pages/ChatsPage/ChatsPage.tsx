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
    if (chat.chatId === id) return chat;
  }
  return undefined;
}

const ChatsPage = () => {
  const [selectedChat, setSelectedChat] = useState<Chat>();

  const [mainWindow, setMainWindow] = useState<MainWindowType>(
    MainWindowType.FriendsAndEnemies
  );

  const initialChats = [
    {
      chatId: "1",
      name: "Димка",
      lastMessage: "Хватит хейтить Куплинова!",
      uuid: "@megakrip01",
    },
    {
      chatId: "2",
      name: "Крипер",
      lastMessage: "Нельзя спать, когда рядом враги!",
      uuid: "@realkriper",
    },
    {
      chatId: "3",
      name: "Игорь",
      lastMessage: "Ща катку доиграю и с вами пойду",
      uuid: "@igor_mango",
    },
    {
      chatId: "4",
      name: "Илюша",
      lastMessage: "Го на следующий фильм по клинку",
      uuid: "@abcdefgh12",
    },
  ];

  const handleChatChange = (chatId: string) => {
    console.log("Выбран чат:", chatId);
    // setSelectedChatId(chatId);
    setSelectedChat(findChatById(initialChats, chatId));
  };
  return (
    <div className={classes.container}>
      <Sidebar />
      <ChatsSidebar
        userId={"user123"}
        onChatChange={handleChatChange}
        initialChats={initialChats}
      />
      {mainWindow === MainWindowType.Dialog && (
        <Dialog selectedChat={selectedChat} />
      )}
      {mainWindow === MainWindowType.FriendsAndEnemies && <FriendsAndEnemies />}
    </div>
  );
};

export default ChatsPage;
