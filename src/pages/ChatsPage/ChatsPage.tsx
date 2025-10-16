import classes from "./ChatsPage.module.css";
import Dialog from "../../components/chatsPage/Dialog";
import { ChatsSidebar } from "../../components/chatsPage/chatsSidebar/ui/ChatsSidebar";
import Sidebar from "../../components/chatsPage/Sidebar";
import { useState } from "react";

const ChatsPage = () => {
  const [selectedChatId, setSelectedChatId] = useState<string>("");

  const handleChatChange = (chatId: string) => {
    console.log("Выбран чат:", chatId);
    setSelectedChatId(chatId);
  };
  return (
    <div className={classes.container}>
      {/*Заглушка под левое меню*/}

      <Sidebar />
      <ChatsSidebar
        userId={"user123"}
        onChatChange={handleChatChange}
        initialChats={[
          { chatId: "1", name: "Димка" },
          { chatId: "2", name: "Витя" },
          { chatId: "3", name: "Игорь" },
          { chatId: "4", name: "Илюша" },
        ]}
      />

      <Dialog />
    </div>
  );
};

export default ChatsPage;
