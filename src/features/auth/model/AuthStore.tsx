import { create } from "zustand";
import { authApi, LoginData, RegisterData, User } from "../api/AuthApi";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  fieldErrors: Record<string, string>;

  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  clearFieldError: (field: string) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  fieldErrors: {},

  login: async (data: LoginData) => {
    set({ isLoading: true, error: null, fieldErrors: {} });

    try {
      const user = await authApi.login(data);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed";
      const fieldErrors = error.response?.data?.errors || {};

      set({
        error: errorMessage,
        fieldErrors,
        isLoading: false,
      });
      throw error;
    }
  },

  register: async (data: RegisterData) => {
    set({ isLoading: true, error: null, fieldErrors: {} });

    try {
      const user = await authApi.register(data);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Registration failed";
      const fieldErrors = error.response?.data?.errors || {};

      set({
        error: errorMessage,
        fieldErrors,
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
        fieldErrors: {},
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

  clearError: () => set({ error: null, fieldErrors: {} }),

  clearFieldError: (field: string) =>
    set((state) => ({
      fieldErrors: { ...state.fieldErrors, [field]: "" },
    })),
}));
