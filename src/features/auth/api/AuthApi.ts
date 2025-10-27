import { baseApi } from "../../../shared/api/http/BaseApi";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  uid: string;
  nickname: string;
  dateOfBirth: string;
  gender: "мужской" | "женский";
}

export const authApi = {
  login: async (data: LoginData): Promise<string> => {
    const response = await baseApi.post("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<string> => {
    const response = await baseApi.post("/auth/register", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await baseApi.post("/auth/logout");
  },

  getCurrentUser: async (): Promise<string> => {
    const response = await baseApi.get("/auth/me");
    return response.data;
  },
};
