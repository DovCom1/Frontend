import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import TestPage from "../pages/TestPage/TestPage";
import ChatsPage from "../pages/ChatsPage/ChatsPage";
import { useAuthStore } from "../features/auth/model/AuthStore";
import { useEffect, useState } from "react";
import { AuthRedirectHandler } from "../features/auth/hooks/AuthRedirectHandler";

function App() {
  const { checkAuth, isLoading: authLoading } = useAuthStore();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setIsAuthChecked(true);
    };
    verifyAuth();
  }, []);

  if (!isAuthChecked || authLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#141111ff",
        }}
      ></div>
    );
  }

  return (
    <BrowserRouter>
      <AuthRedirectHandler />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/chats" element={<ChatsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
