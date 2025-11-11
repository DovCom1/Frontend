import { create } from "zustand";

interface Users{
    id: string;
    uid: string;
    userName: string;
    avatar: string;
}

interface AuthWidgetState {
  users: Users[];
  getUsersById: (uid: string) => void;
  getUsersByName: (name: string) => void;
  addNewFriend: (id: string) => void;
  addNewEnemy: (id: string) => void;
}

export const useAuthWidgetStore = create<AuthWidgetState>((set) => ({
  users: [],
  getUsersById: (uid: string) => {
    
  },
  getUsersByName: (name: string) => {},
  addNewFriend: (id: string) => {},
  addNewEnemy: (id: string) => {},
}));