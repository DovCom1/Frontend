import { create } from "zustand";

interface AuthWidgetState {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  openLogin: () => void;
  openRegister: () => void;
  closeAll: () => void;
  switchToRegister: () => void;
  switchToLogin: () => void;
}

export const useAuthWidgetStore = create<AuthWidgetState>((set) => ({
  isLoginOpen: false,
  isRegisterOpen: false,

  openLogin: () => set({ isLoginOpen: true, isRegisterOpen: false }),
  openRegister: () => set({ isRegisterOpen: true, isLoginOpen: false }),
  closeAll: () => set({ isLoginOpen: false, isRegisterOpen: false }),

  switchToRegister: () => set({ isLoginOpen: false, isRegisterOpen: true }),
  switchToLogin: () => set({ isRegisterOpen: false, isLoginOpen: true }),
}));
