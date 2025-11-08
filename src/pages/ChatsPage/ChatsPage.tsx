import classes from "./ChatsPage.module.css";
import Dialog from "../../components/chatsPage/dialog/ui/Dialog";
import { ChatsSidebar } from "../../components/chatsPage/chatsSidebar/ui/ChatsSidebar";
import Sidebar from "../../components/chatsPage/Sidebar";
import { useState } from "react";
import { Chat } from "../../entities/chat/model/types/chat";
import { dialogList } from "../../components/chatsPage/dialog/api/dialogs";

function findChatById(chats: Chat[], id: string): Chat | undefined {
  for (const chat of chats) {
    if (chat.id === id) return chat;
  }
  return undefined;
}

const ChatsPage = () => {
  const [selectedChat, setSelectedChat] = useState<Chat>();

  const initialChats = [
    {
      id: "1",
      name: "Димка",
      avatarUrl: "/public/images/neuro_dove.png",
    },
  ];

  // нужен метод для получения своего собственного айди
  const getDialogList = async () => {
    dialogList.get("123");
  };

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

      <Dialog selectedChat={selectedChat} />
    </div>
  );
};

export default ChatsPage;
