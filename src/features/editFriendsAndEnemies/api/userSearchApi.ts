const mockUsers: User[] = [
  {
    id: "1",
    uid: "1234567890",
    nickname: "Иван Иванов",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Ivan&backgroundColor=ffdfbf",
    status: "В сети",
  },
  {
    id: "2",
    uid: "0987654321",
    nickname: "Мария Петрова",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria&backgroundColor=ffd5dc",
    status: "Не в сети",
  },
  {
    id: "3",
    uid: "1122334455",
    nickname: "Алексей Сидоров",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexey&backgroundColor=b6e3f4",
    status: "Занят",
  },
  {
    id: "4",
    uid: "5566778899",
    nickname: "Елена Козлова",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena&backgroundColor=c0aede",
    status: "Не беспокоить",
  },
  {
    id: "5",
    uid: "9988776655",
    nickname: "Дмитрий Новиков",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry&backgroundColor=ffdfbf",
    status: "В сети",
  },
  {
    id: "6",
    uid: "4455667788",
    nickname: "Анна Смирнова",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna&backgroundColor=d1d4f9",
    status: "В игре",
  },
  {
    id: "7",
    uid: "3344556677",
    nickname: "Сергей Волков",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Sergey&backgroundColor=b6e3f4",
    status: "Не в сети",
  },
  {
    id: "8",
    uid: "2233445566",
    nickname: "Ольга Морозова",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Olga&backgroundColor=ffd5dc",
    status: "В сети",
  },
  {
    id: "9",
    uid: "6677889900",
    nickname: "Павел Лебедев",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Pavel&backgroundColor=ffdfbf",
    status: "В сети",
  },
  {
    id: "10",
    uid: "7788990011",
    nickname: "Наталья Соколова",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Natalia&backgroundColor=c0aede",
    status: "Не в сети",
  },
  {
    id: "11",
    uid: "8899001122",
    nickname: "Андрей Попов",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Andrey&backgroundColor=d1d4f9",
    status: "В игре",
  },
  {
    id: "12",
    uid: "9900112233",
    nickname: "Татьяна Федорова",
    avatarUrl:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Tatiana&backgroundColor=ffd5dc",
    status: "Занят",
  },
];

export const userSearchApi = {
  searchByNickname: async (
    nickname: string,
    offset: number = 0,
    limit: number = 10
  ): Promise<UsersSearchResponse> => {
    // Имитация задержки сети
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Фильтрация по никнейму
    const filteredUsers = mockUsers.filter((user) =>
      user.nickname.toLowerCase().includes(nickname.toLowerCase())
    );

    // Пагинация
    const paginatedUsers = filteredUsers.slice(
      offset,
      offset + Math.min(limit, 20)
    );

    return {
      data: paginatedUsers,
      offset,
      limit: Math.min(limit, 20),
      total: filteredUsers.length,
    };
  },

  searchByUid: async (uid: string): Promise<User> => {
    // Имитация задержки сети
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Поиск по UID
    const user = mockUsers.find((user) => user.uid === uid);

    if (!user) {
      throw new Error("Пользователь не найден");
    }

    return user;
  },

  addFriend: async (userId: string, friendId: string): Promise<void> => {
    // Имитация добавления в друзья
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log(`Пользователь ${userId} добавил в друзья ${friendId}`);
  },

  addEnemy: async (userId: string, enemyId: string): Promise<void> => {
    // Имитация добавления врага
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log(`Пользователь ${userId} добавил врага ${enemyId}`);
  },
};

export interface User {
  id: string;
  uid: string;
  nickname: string;
  avatarUrl: string;
  status: string;
}

export interface UsersSearchResponse {
  data: User[];
  offset: number;
  limit: number;
  total: number;
}
// import { baseApi } from "../../../shared/api/http/BaseApi";

// export const userSearchApi = {
//   searchByNickname: async (
//     nickname: string,
//     offset: number = 0,
//     limit: number = 10
//   ): Promise<UsersSearchResponse> => {
//     const response = await baseApi.get("/proxy/users/search", {
//       params: { nickname, offset, limit: Math.min(limit, 20) },
//     });
//     return response.data;
//   },

//   searchByUid: async (uid: string): Promise<User> => {
//     const response = await baseApi.get("/proxy/users/search", {
//       params: { uid },
//     });

//     return response.data;
//   },

//   addFriend: async (userId: string, friendId: string): Promise<void> => {
//     await baseApi.post(`/proxy/users/${userId}/friends/${friendId}`);
//   },

//   addEnemy: async (userId: string, enemyId: string): Promise<void> => {
//     await baseApi.post(`/proxy/users/${userId}/enemies/${enemyId}`);
//   },
// };

// export interface User {
//   id: string;
//   uid: string;
//   nickname: string;
//   avatarUrl: string;
//   status: string;
// }

// export interface UsersSearchResponse {
//   data: User[];
//   offset: number;
//   limit: number;
//   total: number;
// }
