import { baseApi } from "../../../shared/api/http/BaseApi";


export const createChatApi = {
  createChat: async (usersId: string[]): Promise<void> => {
    await baseApi.post("/proxy/chats/add", usersId);
    return;
  }
};
