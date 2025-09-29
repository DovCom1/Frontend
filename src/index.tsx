import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';

// Важный импорт! Подгружаются константы стилей.
import '../src/shared/css/main.css';
import '../src/shared/css/default.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

