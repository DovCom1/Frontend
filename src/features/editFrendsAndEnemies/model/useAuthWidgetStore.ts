import { create } from "zustand";
import { User, userSearchApi } from "../api/userSearchApi";

interface AuthWidgetState {
  users: User[];
  loading: boolean;
  error: string | null;
  currentUserId: string | null;
  
  getUsersByUid: (uid: string) => Promise<void>;
  getUsersByName: (name: string, offset?: number, limit?: number) => Promise<void>;
  addNewFriend: (friendId: string) => Promise<void>;
  addNewEnemy: (enemyId: string) => Promise<void>;
  clearUsers: () => void;
  setCurrentUserId: (userId: string) => void;
}

export const useAuthWidgetStore = create<AuthWidgetState>((set, get) => ({
  users: [],
  loading: false,
  error: null,
  currentUserId: null,

  getUsersByUid: async (uid: string) => {
    if (!uid.trim()) {
      set({ users: [], error: null });
      return;
    }

    set({ loading: true, error: null });
    
    try {
      const user = await userSearchApi.searchByUid(uid);
      set({ users: [user], loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : "Ошибка поиска по UID",
        users: []
      });
    }
  },

  getUsersByName: async (name: string, offset: number = 0, limit: number = 10) => {
    if (!name.trim()) {
      set({ users: [], error: null });
      return;
    }

    set({ loading: true, error: null });
    
    try {
      const response = await userSearchApi.searchByNickname(name, offset, limit);
      set({ users: response.data, loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : "Ошибка поиска по имени",
        users: []
      });
    }
  },

  addNewFriend: async (friendId: string) => {
    const { currentUserId } = get();
    if (!currentUserId) {
      set({ error: "ID текущего пользователя не установлен" });
      return;
    }

    try {
      await userSearchApi.addFriend(currentUserId, friendId);
      // Можно обновить UI - убрать кнопку или показать статус
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : "Ошибка добавления в друзья"
      });
      throw error;
    }
  },

  addNewEnemy: async (enemyId: string) => {
    const { currentUserId } = get();
    if (!currentUserId) {
      set({ error: "ID текущего пользователя не установлен" });
      return;
    }

    try {
      await userSearchApi.addEnemy(currentUserId, enemyId);
      // Можно обновить UI - убрать кнопку или показать статус
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : "Ошибка добавления во враги"
      });
      throw error;
    }
  },

  clearUsers: () => {
    set({ users: [], error: null });
  },

  setCurrentUserId: (userId: string) => {
    set({ currentUserId: userId });
  }
}));