import { baseApi } from "../../../shared/api/http/BaseApi";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  username: string;
  birthDate: string;
  gender: "мужщина" | "женщина";
}

export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  birthDate: string;
  gender: "мужщина" | "женщина";
  avatar?: string;
}

export const authApi = {
  login: async (data: LoginData): Promise<User> => {
    const response = await baseApi.post("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<User> => {
    const response = await baseApi.post("/auth/register", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await baseApi.post("/auth/logout");
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await baseApi.get("/auth/me");
    return response.data;
  },
};
