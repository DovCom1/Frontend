import { baseApi } from "../../../shared/api/http/BaseApi";
//это супер не верно Асуждаю себя
import { User } from "../../../features/editFriendsAndEnemies/api/userSearchApi";

// export interface UsersResponse {
//   // нужно придумать общий тип  для всех User
//   data: User[];
//   offset: number;
//   limit: number;
//   total: number;
// }

// export const FriendsAndEnemiesApi = {
//   getFriends: async (
//     userId: string,
//     offset: number = 0,
//     limit: number = 5
//   ): Promise<UsersResponse> => {
//     const response = await baseApi.get(`/proxy/users/${userId}/friends`, {
//       params: { offset, limit: Math.min(limit, 20) },
//     });
//     return response.data;
//   },

//   getEnemies: async (
//     userId: string,
//     offset: number = 0,
//     limit: number = 5
//   ): Promise<UsersResponse> => {
//     const response = await baseApi.get(`/proxy/users/${userId}/enemies`, {
//       params: { offset, limit: Math.min(limit, 20) },
//     });
//     return response.data;
//   },
// };
// Mock данные для тестирования

export interface UsersResponse {
  data: User[];
  offset: number;
  limit: number;
  total: number;
}

// Mock пользователи
const mockFriends: User[] = [
  {
    id: "1",
    uid: "user_001",
    nickname: "Крипер",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=John&backgroundColor=ffdfbf",
    status: "В сети",
  },
  {
    id: "2",
    uid: "user_002",
    nickname: "Димка",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane&backgroundColor=d1d4f9",
    status: "Не в сети",
  },
  {
    id: "3",
    uid: "user_003",
    nickname: "Илюшка",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike&backgroundColor=b6e3f4",
    status: "В сети",
  },
  {
    id: "4",
    uid: "user_004",
    nickname: "Игорь",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=ffd5dc",
    status: "Занят",
  },
];

const mockEnemies: User[] = [
  {
    id: "5",
    uid: "user_005",
    nickname: "TomBrown",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom&backgroundColor=c0aede",
    status: "В сети",
  },
  {
    id: "6",
    uid: "user_006",
    nickname: "EmmaDavis",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma&backgroundColor=ffdfbf",
    status: "Не в сети",
  },
  {
    id: "7",
    uid: "user_007",
    nickname: "AlexTaylor",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=d1d4f9",
    status: "В сети",
  },
  {
    id: "8",
    uid: "user_008",
    nickname: "LisaMiller",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa&backgroundColor=b6e3f4",
    status: "В сети",
  },
  {
    id: "9",
    uid: "user_009",
    nickname: "DavidWilson",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=ffd5dc",
    status: "Занят",
  },
  {
    id: "10",
    uid: "user_010",
    nickname: "MariaGarcia",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria&backgroundColor=c0aede",
    status: "Не в сети",
  },
];

// Mock реализация API
export const FriendsAndEnemiesApi = {
  getFriends: async (
    userId: string,
    offset: number = 0,
    limit: number = 5
  ): Promise<UsersResponse> => {
    // Имитация задержки сети
    await new Promise((resolve) => setTimeout(resolve, 300));

    const startIndex = offset;
    const endIndex = offset + Math.min(limit, 20);
    const paginatedUsers = mockFriends;

    return {
      data: paginatedUsers,
      offset,
      limit: Math.min(limit, 20),
      total: mockFriends.length,
    };
  },

  getEnemies: async (
    userId: string,
    offset: number = 0,
    limit: number = 5
  ): Promise<UsersResponse> => {
    // Имитация задержки сети
    await new Promise((resolve) => setTimeout(resolve, 300));

    const startIndex = offset;
    const endIndex = offset + Math.min(limit, 20);
    // Для врагов берем другую часть данных для разнообразия
    const enemiesData = mockEnemies;

    return {
      data: enemiesData,
      offset,
      limit: Math.min(limit, 20),
      total: mockEnemies.length,
    };
  },
};
