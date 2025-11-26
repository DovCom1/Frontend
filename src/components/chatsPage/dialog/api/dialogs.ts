import { Chat } from "../../../../entities/chat/model/types/chat";
import { baseApi } from "../../../../shared/api/http/BaseApi";

export const dialogList = {
  get: async (userId: string): Promise<Chat[]> => {
    const response = await baseApi.get(`/api/chats/users/${userId}`);
    return response.data;
  },
};
