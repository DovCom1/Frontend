import { baseApi } from "../../../../shared/api/http/BaseApi";


export interface FriendResponse {
  userId: string;
  friendId: string;
  status: string;
}

export interface InviteActionResponse {
  success: boolean;
  message: string;
  data?: FriendResponse;
}

export const friendsApi = {
  // Принять заявку в друзья
  acceptFriendRequest: async (
    userId: string, 
    friendId: string
  ): Promise<FriendResponse> => {
    try {
      const response = await baseApi.patch<FriendResponse>(
        `/api/users/${userId}/friends/${friendId}/accept`
      );
      
      console.log('Заявка принята:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при принятии заявки:', error);
      throw error;
    }
  },

  // Отклонить заявку в друзья
  rejectFriendRequest: async (
    userId: string, 
    friendId: string
  ): Promise<FriendResponse> => {
    try {
      const response = await baseApi.patch<FriendResponse>(
        `/api/users/${userId}/friends/${friendId}/reject`
      );
      
      console.log('Заявка отклонена:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при отклонении заявки:', error);
      throw error;
    }
  },
};