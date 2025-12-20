import { create } from "zustand";
import { authApi, LoginData, RegisterData } from "../api/AuthApi";
import { useSignalRStore } from "../../../shared/api/websocket/model/SignalRStore";
import { userState } from "../../../entities/mainUser/model/UserState";

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

  handle: (dto: any) => {
    console.log("✅ handle ВЫЗВАН с данными:", dto);
    return "OK";
  },

  login: async (data: LoginData) => {
    set({ isLoading: true, error: null });

    try {
      const userId = await authApi.login(data);

      console.log("вот id из логина:" + userId);

      userState.setUserId(userId);

      set({
        isAuthenticated: true,
        isLoading: false,
      });

      const signalRStore = useSignalRStore.getState();

      await signalRStore.connect(userId);

      //signalRStore.subscribe("ReceiveNotification", handle);
      signalRStore.subscribe("ReceiveNotification", (dto: any) => {
        console.log("Сигнал получен в подписке");
        return handle(dto);
      });

      console.log("SignalR connection established after login");
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
      const userId = await authApi.getCurrentUser();
      userState.setUserId(userId);
      const signalRStore = useSignalRStore.getState();
      if (!signalRStore.isConnected) {
        await signalRStore.connect(userId);
      } else {
        console.log("SignalR already connected");
      }
      // signalRStore.subscribe("ReceiveNotification", handle);

      signalRStore.subscribe("ReceiveNotification", (dto: any) => {
        console.log("📨 Сигнал получен в подписке");
        return handle(dto); // Простой синхронный вызов
      });

      set({
        isAuthenticated: true,
        isLoading: false,
      });
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
      await authApi.register(data);

      const loginData: LoginData = {
        email: data.email,
        password: data.password,
      };

      const userId = await authApi.login(loginData);

      const signalRStore = useSignalRStore.getState();

      await signalRStore.connect(userId);

      userState.setUserId(userId);

      set({ isAuthenticated: true, isLoading: false });

      console.log("SignalR connection established after registration");
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
function handle(dto: any) {
  throw new Error("Function not implemented.");
}
