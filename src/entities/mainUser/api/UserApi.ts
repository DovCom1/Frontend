import { baseApi } from "../../../shared/api/http/BaseApi";
import { MainUser } from "../types/MainUser";

export const userApi = {
    getMyUser: async (): Promise<MainUser> => {
        const response = await baseApi.get("/auth/me");
        return response.data;
      },
}