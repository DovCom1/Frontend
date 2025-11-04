import axios from "axios";

export const baseApi = axios.create({
  baseURL: process.env.API_URL || "http://localhost:8080/api",
  withCredentials: true, // Важно для кук
  timeout: 10000,
});
// Интерцептор для обработки ошибок
baseApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // наверное перенаправление на базовую страничку т.к пользователь не зареган
    }
    // а тут Перенаправление ошибки дальше вдруг найдётся тот кто с умеет её с итерпритировать
    return Promise.reject(error);
  }
);
