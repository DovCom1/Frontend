import Sidebar from "../components/chatsPage/Sidebar";
import { ChatsSidebar } from "../components/chatsPage/chatsSidebar/ui/ChatsSidebar";
import { Chat } from "../entities/chat/model/types/chat";

const DimaTestPage = () => {
  //эта штука только ради проверки
  const mockChats: Chat[] = [
    { chatId: "1", name: "Димка" },
    { chatId: "2", name: "Витя" },
    { chatId: "3", name: "Игорь" },
    { chatId: "4", name: "Илюша" },
    { chatId: "5", name: "Сенькин" },
    { chatId: "6", name: "Пуджик" },
    { chatId: "7", name: "Димка" },
    { chatId: "8", name: "Витя" },
    { chatId: "9", name: "Игорь" },
    { chatId: "10", name: "Илюша" },
    { chatId: "11", name: "Сенькин" },
    { chatId: "12", name: "Пуджик" },
    { chatId: "13", name: "Димка" },
    { chatId: "14", name: "Витя" },
    { chatId: "15", name: "Игорь" },
    { chatId: "16", name: "Илюша" },
    { chatId: "17", name: "Сенькин" },
    { chatId: "18", name: "Пуджик" },
  ];

  const isSidebarOpen = false;
  const handleChatChange = (chatId: string) => {
    console.log("Выбран чат:", chatId);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* <EditFrendsAndEnemiesWidget/> */}
      {/* Sidebar слева - будет перекрывать ChatsSidebar при растягивании */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 20,
        }}
      >
        <Sidebar />
      </div>

      {/* ChatsSidebar - с отступом под закрытое состояние Sidebar */}
      <div
        style={{
          width: "340px",
          height: "100%",
          marginLeft: "50px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <ChatsSidebar
          userId="user123"
          onChatChange={handleChatChange}
          initialChats={mockChats} //эта штука только ради проверки
        />
      </div>

      {/* Основной контент страницы */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          minWidth: 0,
          backgroundColor: "#f5f5f5",
        }}
      >
        <h1>Чат приложение</h1>
        <p>Выберите чат из списка слева</p>

        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Основной контент</h2>
          <p>При растягивании Sidebar будет перекрывать часть списка чатов</p>
          <p>Сейчас выбран чат с ID {}</p>
          <p>
            Текущее состояние Sidebar: {isSidebarOpen ? "открыт" : "закрыт"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DimaTestPage;
