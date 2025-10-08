import React from "react";
import MainPage from "../pages/MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestPage from "../pages/TestPage/TestPage";
import { useRootScale } from "../shared/utils/setScaling";

function App() {
  useRootScale(1920, 100);

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
