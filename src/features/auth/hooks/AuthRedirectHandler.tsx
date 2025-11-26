import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../model/AuthStore";

export const AuthRedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (isLoading) return;

    console.log("проверка авторизации:", {
      isAuthenticated,
      pathname: location.pathname,
    });

    if (isAuthenticated && location.pathname === "/") {
      console.log("Перенаправление на чаты");
      navigate("/chats", { replace: true });
    }
    // else if (!isAuthenticated && location.pathname === "/chats") {
    //   console.log(
    //     "Перенаправление на главную страницу т.к ты дебил и не зареган"
    //   );
    //   navigate("/", { replace: true });
    // }
  }, [isAuthenticated, isLoading, location.pathname, navigate]);

  return null;
};
