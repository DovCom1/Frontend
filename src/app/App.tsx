import MainPage from "../pages/MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestPage from "../pages/TestPage/TestPage";
import DimaTestPage from "../pages/DimaTestPage";

// TODO: Сделать молекулу кнопка + текст -> кнопка
//  Сделать молекулу сетка объектов: колонка, строчка, таблица
//  Подумать над стилями для стандартных кнопок
import ChatsPage from "../pages/ChatsPage/ChatsPage";

function App() {
  // useRootScale(1920, 100);

  return (
    <BrowserRouter>
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
