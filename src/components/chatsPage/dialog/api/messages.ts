import { baseApi } from "../../../../shared/api/http/BaseApi";
import { MessageEntity } from "../../../../entities/message/messageEntity";

export interface MessagesResponse {
  messages: MessageEntity[];
}

export const messageHistoryApi = {
  get: async (
    chatId: string,
    pageNumber?: number,
    pageSize?: number,
  ): Promise<MessagesResponse> => {
    pageNumber = pageNumber || 1;
    pageSize = pageSize || 20;

    const response = await baseApi.get(
      `/chats/${chatId}/messages?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    );
    return response.data;
  },
};

export const sendMessage = {
  post: async (
    chatId: string,
    userId: string | undefined,
    content: string,
  ): Promise<number> => {
    // /api/chats/{chatId}/messages
    const response = await baseApi.post(`/chats/${chatId}/messages`, {
      content: content,
      userId: userId,
    });
    return response.data;
  },
};
