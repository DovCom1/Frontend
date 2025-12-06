import { baseApi } from "../../../shared/api/http/BaseApi";
import { User } from "../../../shared/types/User";

export const userApi = {
  getMyUser: async (userId: string): Promise<User> => {
    console.log("userId" + userId);
    const response = await baseApi.get(`/proxy/users/${userId}`);
    
    return response.data;
  },
};
