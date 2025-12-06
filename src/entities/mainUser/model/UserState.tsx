import { User } from "../../../shared/types/User";
import { userApi } from "../api/UserApi";

export class UserState {
  private userId: string = "-";
  private user: User | null = null;
  private loading: boolean = false;
  private error: string | null = null;

  // Получить полную информацию о пользователе
  async getUser(): Promise<User> {
    if (this.user && !this.loading) {
      return this.user;
    }

    this.loading = true;
    this.error = null;

    try {
      const userData = await userApi.getMyUser(this.userId);
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
    console.log("У МЕНЯ ПРОСЯТ USER ID:" + this.userId);
    if (this.user) {
      return this.user.id;
    }
    if (this.userId !== "-") {
      return this.userId;
    }

    this.loading = true;
    this.error = null;

    try {
      const userData = await userApi.getMyUser(this.userId);
      this.user = userData;
      this.loading = false;
      return userData.id;
    } catch (error) {
      this.loading = false;
      this.error =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      throw error;
    }
  }
  setUserId(userId: string) {
    this.userId = userId;
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
  getUserData(): User | null {
    return this.user;
  }

  // Обновить данные пользователя
  updateUser(updates: Partial<User>): void {
    if (this.user) {
      this.user = { ...this.user, ...updates };
    }
  }
}

export const userState = new UserState();
