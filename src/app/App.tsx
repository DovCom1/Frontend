import MainPage from "../pages/MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestPage from "../pages/TestPage/TestPage";
import DimaTestPage from "../pages/DimaTestPage";

// TODO: Сделать молекулу кнопка + текст -> кнопка
//  Сделать молекулу сетка объектов: колонка, строчка, таблица
//  Подумать над стилями для стандартных кнопок
import ChatsPage from "../pages/ChatsPage/ChatsPage";
import { useAuthStore } from "../features/auth/model/AuthStore";
import { useEffect } from "react";
import { AuthRedirectHandler } from "../features/auth/hooks/AuthRedirectHandler";

function App() {
  // useRootScale(1920, 100);

  const { checkAuth } = useAuthStore();

  // Проверяем аутентификацию при загрузке приложения
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <AuthRedirectHandler />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/dimaTest" element={<DimaTestPage />} />
        <Route path="/chats" element={<ChatsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
