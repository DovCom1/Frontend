import { Chat } from "../../../../entities/chat/model/types/chat";
import { baseApi } from "../../../../shared/api/http/BaseApi";

export const members = {
  get: async (chatId: string): Promise<any> => {
    const response = await baseApi.get(`/proxy/chats/${chatId}/members`);
    return response.data;
  },
};
