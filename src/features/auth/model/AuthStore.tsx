import { create } from "zustand";
import { authApi, LoginData, RegisterData } from "../api/AuthApi";
import { useWebSocketStore } from "../../../shared/api/websocket/model/WebsocketStore";

interface AuthState {
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
  isAuthenticated: false,
  isLoading: false,
  error: null,
  fieldErrors: {},

  login: async (data: LoginData) => {
    set({ isLoading: true, error: null });

    try {
      const token = await authApi.login(data);

      set({
        isAuthenticated: true,
        isLoading: false,
      });

      if (token) {
        const wsStore = useWebSocketStore.getState();
        await wsStore.connect(token.token);
      }
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Login failed",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });

    try {
      const token = await authApi.getCurrentUser();

      set({
        isAuthenticated: true,
        isLoading: false,
      });

      if (token) {
        const wsStore = useWebSocketStore.getState();
        if (!wsStore.isConnected) {
          await wsStore.connect(token);
        }
      }
    } catch (error: any) {
      set({
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  register: async (data: RegisterData) => {
    set({ isLoading: true, error: null });

    try {
      const token = await authApi.register(data);
      set({ isAuthenticated: true, isLoading: false });

      if (token) {
        const wsStore = useWebSocketStore.getState();
        if (!wsStore.isConnected) {
          await wsStore.connect(token.token);
        }
      }
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
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
  clearError: () => set({ error: null }),
}));
