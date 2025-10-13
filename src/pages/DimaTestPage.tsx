import Sidebar from "../components/chatsPage/Sidebar";
import { ChatsSidebar } from "../components/chatsPage/chatsSidebar/ui/ChatsSidebar";

const DimaTestPage = () => {
  const mockChats = [
    { id: "1", name: "Димка", icon: "" },
    { id: "2", name: "Витя", icon: "" },
    { id: "3", name: "Игорь", icon: "" },
    { id: "4", name: "Илюша", icon: "" },
    { id: "5", name: "Сенькин", icon: "" },
    { id: "6", name: "Пуджик", icon: "" },
    { id: "7", name: "Димка", icon: "" },
    { id: "8", name: "Витя", icon: "" },
    { id: "9", name: "Игорь", icon: "" },
    { id: "10", name: "Илюша", icon: "" },
    { id: "11", name: "Сенькин", icon: "" },
    { id: "12", name: "Пуджик", icon: "" },
    { id: "13", name: "Димка", icon: "" },
    { id: "14", name: "Витя", icon: "" },
    { id: "15", name: "Игорь", icon: "" },
    { id: "16", name: "Илюша", icon: "" },
    { id: "17", name: "Сенькин", icon: "" },
    { id: "18", name: "Пуджик", icon: "" },
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
          initialChats={mockChats}
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
