import { Chat } from "../../../../entities/chat/model/types/chat";
import { baseApi } from "../../../../shared/api/http/BaseApi";

export interface ChatsResponse {
  chats: Chat[];
}

export const getChatsApi = {
  get: async (userId: string): Promise<ChatsResponse> => {
    const response = await baseApi.get(`/chats/users/${userId}`);
    return response.data;
  },
};
