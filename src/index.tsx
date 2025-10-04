import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";

// Важный импорт! Подгружаются константы стилей.
import "../public/css/main.css";
import "../public/css/default.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
