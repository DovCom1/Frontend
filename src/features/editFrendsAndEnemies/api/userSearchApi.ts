import { baseApi } from "../../../shared/api/http/BaseApi";

export const userSearchApi = {
  searchByNickname: async (nickname: string, offset: number = 0, limit: number = 10): Promise<UsersSearchResponse> => {
    const response = await baseApi.get("/api/users/search", {
      params: { nickname, offset, limit: Math.min(limit, 20) }
    });
    return response.data;
  },

  searchByUid: async (uid: string): Promise<User> => {
    const response = await baseApi.get("/api/users/search", {
      params: { uid }
    });
    return response.data;
  },

  addFriend: async (userId: string, friendId: string): Promise<void> => {
    await baseApi.post(`/api/users/${userId}/friends/${friendId}`);
  },

  addEnemy: async (userId: string, enemyId: string): Promise<void> => {
    await baseApi.post(`/api/users/${userId}/enemies/${enemyId}`);
  }
};

export interface User {
  id: string;
  uid: string;
  nickname: string;
  avatarUrl: string;
  status: string;
}

export interface UsersSearchResponse {
  data: User[];
  offset: number;
  limit: number;
  total: number;
}