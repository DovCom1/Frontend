import { create } from "zustand";
import { authApi, LoginData, RegisterData, User } from "../api/AuthApi";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  fieldErrors: {},

  login: async (data: LoginData) => {
    set({ isLoading: true, error: null });

    try {
      const user = await authApi.login(data);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed";

      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  register: async (data: RegisterData) => {
    set({ isLoading: true, error: null });

    try {
      const user = await authApi.register(data);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Registration failed";

      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });

    try {
      await authApi.logout();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Logout failed";
      set({ error: errorMessage });
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });

    try {
      const user = await authApi.getCurrentUser();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Auth check failed";
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage,
      });
    }
  },
  clearError: () => set({ error: null }),
}));
