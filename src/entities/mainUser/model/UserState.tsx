import { userApi } from "../api/UserApi";
import { MainUser } from "../types/MainUser";

export class UserState {
  private user: MainUser | null = null;
  private loading: boolean = false;
  private error: string | null = null;

  // Получить полную информацию о пользователе
  async getUser(): Promise<MainUser> {
    if (this.user && !this.loading) {
      return this.user;
    }

    this.loading = true;
    this.error = null;

    try {
      const userData = await userApi.getMyUser();
      this.user = userData;
      this.loading = false;
      return userData;
    } catch (error) {
      this.loading = false;
      this.error =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      throw error;
    }
  }

  // Получить ID пользователя с проверкой существования
  async getUserId(): Promise<string> {
    console.log("Низабудь ипсравить ID");
    return "asdasdddddsssssssssssssssssssssssss";
    // if (this.user) {
    //   return this.user.id;
    // }

    // this.loading = true;
    // this.error = null;

    // try {
    //   const userData = await userApi.getMyUser();
    //   this.user = userData;
    //   this.loading = false;
    //   return userData.id;
    // } catch (error) {
    //   this.loading = false;
    //   this.error = error instanceof Error ? error.message : "Неизвестная ошибка";
    //   throw error;
    // }
  }

  // Синхронное получение ID (если пользователь уже загружен)
  getUserIdSync(): string | null {
    return this.user?.id || null;
  }

  // Проверить, загружен ли пользователь
  isUserLoaded(): boolean {
    return this.user !== null;
  }

  // Получить текущее состояние загрузки
  isLoading(): boolean {
    return this.loading;
  }

  getError(): string | null {
    return this.error;
  }

  clear(): void {
    this.user = null;
    this.loading = false;
    this.error = null;
  }

  // Получить полные данные пользователя (без загрузки)
  getUserData(): MainUser | null {
    return this.user;
  }

  // Обновить данные пользователя
  updateUser(updates: Partial<MainUser>): void {
    if (this.user) {
      this.user = { ...this.user, ...updates };
    }
  }
}

export const userState = new UserState();
