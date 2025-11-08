import { baseApi } from "../../../shared/api/http/BaseApi";
//это супер не верно Асуждаю себя
import { User } from "../../../features/editFriendsAndEnemies/api/userSearchApi";

export interface UsersResponse {
  // нужно придумать общий тип  для всех User
  data: User[];
  offset: number;
  limit: number;
  total: number;
}

export const FriendsAndEnemiesApi = {
  getFriends: async (
    userId: string,
    offset: number = 0,
    limit: number = 5
  ): Promise<UsersResponse> => {
    const response = await baseApi.get(`/api/users/${userId}/friends`, {
      params: { offset, limit: Math.min(limit, 20) },
    });
    return response.data;
  },

  getEnemies: async (
    userId: string,
    offset: number = 0,
    limit: number = 5
  ): Promise<UsersResponse> => {
    const response = await baseApi.get(`/api/users/${userId}/enemies`, {
      params: { offset, limit: Math.min(limit, 20) },
    });
    return response.data;
  },
};
