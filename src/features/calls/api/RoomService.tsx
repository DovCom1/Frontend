// services/RoomService.ts
import { baseApi } from "../../../shared/api/http/BaseApi";

// Типизация ответа от бэкенда
export interface RoomResponse {
  roomId: string;
  name: string;
  participants: any[];
}

class RoomService {
  // Базовый путь относительно baseApi (который уже смотрит в /api)
  // Если контроллер на бэке: [Route("api/rooms")]
  private ENDPOINT = "/rooms"; 

  /**
   * Создает новую комнату
   * POST /api/rooms
   */
  async createRoom(name: string): Promise<RoomResponse> {
    try {
      // baseApi.post<T> уже типизирован, но response.data содержит тело
      const response = await baseApi.post<RoomResponse>(this.ENDPOINT, {
        name: name,
      });
      return response.data;
    } catch (error) {
      console.error("RoomService: Ошибка при создании комнаты", error);
      throw error; // Пробрасываем ошибку, чтобы UI (DialogHeader) мог снять спиннер
    }
  }

  /**
   * Получение инфо о комнате (пригодится при входе по ссылке)
   * GET /api/rooms/{roomId}
   */
  async getRoom(roomId: string): Promise<RoomResponse> {
    const response = await baseApi.get<RoomResponse>(`${this.ENDPOINT}/${roomId}`);
    return response.data;
  }

  /**
   * Удаление комнаты
   */
  async deleteRoom(roomId: string): Promise<void> {
    await baseApi.delete(`${this.ENDPOINT}/${roomId}`);
  }
}

export const roomService = new RoomService();