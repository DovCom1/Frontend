import React from "react";
import MainPage from "../pages/MainPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TestPage from "../pages/TestPage/TestPage";

// TODO: Сделать молекулу кнопка + текст -> кнопка
//  Сделать молекулу сетка объектов: колонка, строчка, таблица
//  Подумать над стилями для стандартных кнопок

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
