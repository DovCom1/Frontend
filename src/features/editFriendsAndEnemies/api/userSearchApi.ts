const mockUsers: User[] = [
  {
    id: "1",
    uid: "1234567890",
    nickname: "Иван Иванов",
    avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    status: "В сети",
  },
  {
    id: "2",
    uid: "0987654321",
    nickname: "Мария Петрова",
    avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    status: "Не в сети",
  },
  {
    id: "3",
    uid: "1122334455",
    nickname: "Алексей Сидоров",
    avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    status: "Занят",
  },
  {
    id: "4",
    uid: "5566778899",
    nickname: "Елена Козлова",
    avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    status: "Не беспокоить",
  },
  {
    id: "5",
    uid: "9988776655",
    nickname: "Дмитрий Новиков",
    avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    status: "В сети",
  },
  {
    id: "6",
    uid: "4455667788",
    nickname: "Анна Смирнова",
    avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    status: "В игре",
  },
  {
    id: "7",
    uid: "3344556677",
    nickname: "Сергей Волков",
    avatarUrl: "https://randomuser.me/api/portraits/men/4.jpg",
    status: "Не в сети",
  },
  {
    id: "8",
    uid: "2233445566",
    nickname: "Ольга Морозова",
    avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg",
    status: "В сети",
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
//   searchByNickname: async (nickname: string, offset: number = 0, limit: number = 10): Promise<UsersSearchResponse> => {
//     const response = await baseApi.get("/api/users/search", {
//       params: { nickname, offset, limit: Math.min(limit, 20) }
//     });
//     return response.data;
//   },

//   searchByUid: async (uid: string): Promise<User> => {
//     const response = await baseApi.get("/api/users/search", {
//       params: { uid }
//     });

//     return response.data;
//   },

//   addFriend: async (userId: string, friendId: string): Promise<void> => {
//     await baseApi.post(`/api/users/${userId}/friends/${friendId}`);
//   },

//   addEnemy: async (userId: string, enemyId: string): Promise<void> => {
//     await baseApi.post(`/api/users/${userId}/enemies/${enemyId}`);
//   }
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
