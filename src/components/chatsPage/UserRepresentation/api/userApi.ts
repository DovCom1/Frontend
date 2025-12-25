import { baseApi } from "../../../../shared/api/http/BaseApi";
import { User } from "../../../../shared/types/User";

export const getUser = async (userId: string): Promise<User> => {
  const response = await baseApi.get(`/proxy/users/${userId}`);
  return response.data;
};

// export const getUser = async (userId: string): Promise<User> => {
//   return {
//     id: "1",
//     uid: "auth0|123456789",
//     nickname: "johndoe",
//     email: "john.doe@example.com",
//     avatarUrl:
//       "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom&backgroundColor=c0aede",
//     gender: "Мужской",
//     status: "В сети",
//     dateOfBirth: "1990-05-15",
//     accountCreationTime: "2024-01-15T10:30:00.000Z",
//   };
// };
