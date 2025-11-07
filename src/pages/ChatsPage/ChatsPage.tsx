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
    MainWindowType.Dialog
  );

  const closeFriendsAndEnemies = () => {
    console.log("API URL:", process.env.REACT_APP_API_BASE_URL);
    setMainWindow(MainWindowType.Dialog);
  };

  const initialChats = [
    {
      chatId: "1",
      name: "Димка",
      lastMessage: "Хватит хейтить Куплинова!",
      avatarUrl:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane&backgroundColor=d1d4f9",
      uuid: "@megakrip01",
    },
    {
      chatId: "2",
      name: "Крипер",
      lastMessage: "Нельзя спать, когда рядом враги!",
      avatarUrl:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=John&backgroundColor=ffdfbf",
      uuid: "@realkriper",
    },
    {
      chatId: "3",
      name: "Игорь",
      lastMessage: "Ща катку доиграю и с вами пойду",
      avatarUrl:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=ffd5dc",
      uuid: "@igor_mango",
    },
    {
      chatId: "4",
      name: "Илюша",
      lastMessage: "Го на следующий фильм по клинку",
      avatarUrl:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike&backgroundColor=b6e3f4",
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
      <Sidebar onMainWindowTypeChange={setMainWindow} />
      <ChatsSidebar
        userId={"user123"}
        onChatChange={handleChatChange}
        initialChats={initialChats}
      />
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
