import { baseApi } from "../../../../shared/api/http/BaseApi";
import { MessageEntity } from "../../../../entities/message/messageEntity";
import { Chat } from "../../../../entities/chat/model/types/chat";

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
    userId: string,
    content: string,
    receiverId?: string,
  ): Promise<number> => {
    if (receiverId !== undefined) {
      const response = await baseApi.post(`/chats/${userId}/messages`, {
        content: content,
        receiverId: receiverId,
        userId: userId,
      });
      return response.data;
    } else {
      const response = await baseApi.post(`/chats/messages`, {
        content: content,
        userId: userId,
      });
      return response.data;
    }
  },
};
