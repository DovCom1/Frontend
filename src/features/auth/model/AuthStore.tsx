import { create } from "zustand";
import { authApi, LoginData, RegisterData } from "../api/AuthApi";
import { useSignalRStore } from "../../../shared/api/websocket/model/SignalRStore";

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

  login: async (data: LoginData) => {
    set({ isLoading: true, error: null });

    try {
      const token = await authApi.login(data);

      set({
        isAuthenticated: true,
        isLoading: false,
      });

      if (token) {
        const signalRStore = useSignalRStore.getState();

        signalRStore.setToken(token.token);
        await signalRStore.connect(token.token);

        console.log("SignalR connection established after login");
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
        const signalRStore = useSignalRStore.getState();

        // Устанавливаем токен и подключаемся, если еще не подключены
        signalRStore.setToken(token);

        if (!signalRStore.isConnected) {
          await signalRStore.connect(token);
        } else {
          console.log("SignalR already connected");
        }
      }
    } catch (error: any) {
      set({
        isAuthenticated: false,
        isLoading: false,
      });

      // При ошибке проверки аутентификации отключаем SignalR
      const signalRStore = useSignalRStore.getState();
      if (signalRStore.isConnected) {
        await signalRStore.disconnect();
      }
    }
  },

  register: async (data: RegisterData) => {
    set({ isLoading: true, error: null });

    try {
      const token = await authApi.register(data);
      set({ isAuthenticated: true, isLoading: false });

      if (token) {
        const signalRStore = useSignalRStore.getState();

        // Устанавливаем токен и подключаемся к SignalR
        signalRStore.setToken(token.token);
        await signalRStore.connect(token.token);

        console.log("SignalR connection established after registration");
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
      const signalRStore = useSignalRStore.getState();
      if (signalRStore.isConnected) {
        await signalRStore.disconnect();
        console.log("SignalR disconnected on logout");
      }

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
