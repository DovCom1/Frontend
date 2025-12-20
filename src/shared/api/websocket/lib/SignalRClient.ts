import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
  IStreamResult,
} from "@microsoft/signalr";

export interface SignalRMessage {
  type: string;
  payload?: any;
  method?: string;
}

export class SignalRClient {
  private connection: HubConnection | null = null;
  private listeners = new Map<string, Set<Function>>();
  private readonly hubUrl: string;
  private isConnecting = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  public onConnectionChange?: (isConnected: boolean) => void;
  public onReconnecting?: () => void;
  public onReconnected?: (connectionId?: string) => void;
  public onError?: (error: Error) => void;

  constructor(hubUrl?: string) {
    this.hubUrl = hubUrl || process.env.SIGNALR_URL || "";
  }

  async connect(chatId : string): Promise<void> {
    if (this.isConnecting) {
      return;
    }

    this.isConnecting = true;

    try {
      this.connection = new HubConnectionBuilder()
        .withUrl(this.hubUrl, {
          skipNegotiation: false,
          transport: HttpTransportType.WebSockets,
        })
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: (retryContext) => {
            this.reconnectAttempts = retryContext.previousRetryCount;

            if (retryContext.previousRetryCount < 3) {
              return 2000;
            } else {
              return 5000;
            }
          },
        })
        .configureLogging(LogLevel.Information)
        .build();

      this.setupConnectionHandlers();

      await this.connection.start();
      await this.connection.invoke('Connect', chatId);
      console.log("SignalR connected successfully");

      this.reconnectAttempts = 0;
      this.isConnecting = false;
      this.onConnectionChange?.(true);
    } catch (error) {
      this.isConnecting = false;
      this.onError?.(error as Error);
      throw error;
    }
  }

  private setupConnectionHandlers() {

    if (!this.connection) return;

    this.connection.onreconnecting((error) => {
      console.log("SignalR reconnecting due to error:", error);
      this.onReconnecting?.();
      this.onConnectionChange?.(false);
    });

    //это для проверки, оно должно быть 
    this.connection.on("ReceiveNotification", (data : any) => {
    //console.log("ReceiveNotification пж дойди", data);
      this.notifySubscribers("ReceiveNotification", [data]); // Оберните data в массив
    })

    this.connection.onreconnected((connectionId) => {
      console.log("SignalR reconnected with connectionId:", connectionId);
      this.reconnectAttempts = 0;
      this.onReconnected?.(connectionId);
      this.onConnectionChange?.(true);
    });

    this.connection.onclose((error) => {
      console.log("SignalR connection closed:", error);
      this.onConnectionChange?.(false);
    });
  }

  private notifySubscribers(methodName: string, args: any[]) {
  const subscribers = this.listeners.get(methodName);
  
  console.log(`=== notifySubscribers для "${methodName}" ===`);
  console.log(`Подписчики найдены: ${!!subscribers}`);
  console.log(`Количество подписчиков: ${subscribers?.size || 0}`);
  
  if (subscribers) {
    // Преобразуем Set в массив для удобной нумерации
    const subscribersArray = Array.from(subscribers);
    
    subscribersArray.forEach((callback, index) => {
      console.log(`\n--- Обработка подписчика ${index} ---`);
      
      // Проверка 1: Существует ли callback
      if (!callback) {
        console.error(`❌ Подписчик ${index}: callback is null/undefined`);
        return;
      }
      
      // Проверка 2: Это функция?
      if (typeof callback !== 'function') {
        console.error(`❌ Подписчик ${index}: callback не функция. Тип: ${typeof callback}, Значение:`, callback);
        return;
      }
      
      // Проверка 3: Проверяем прототип
      console.log(`✅ Подписчик ${index} является функцией`);
      console.log(`   Имя функции: ${callback.name || 'anonymous'}`);
      console.log(`   Ожидает параметров: ${callback.length}`);
      console.log(`   Прототип:`, Object.getPrototypeOf(callback));
      
      // Проверка 4: Можно ли вызвать?
      try {
        // Пробуем вызвать с тестовыми данными
        console.log(`   Пробуем вызвать...`);
        const result = callback("TEST_STRING");
        console.log(`   ✅ Вызов успешен!`);
        console.log(`   Результат:`, result);
        
        // Если результат - Promise
        if (result && typeof result.then === 'function') {
          console.log(`   ⚠️ Функция вернула Promise`);
          result
            .then((promiseResult: any) => {
              console.log(`   Promise resolved:`, promiseResult);
            })
            .catch((promiseError: any) => {
              console.error(`   Promise rejected:`, promiseError);
            });
        }
      } catch (error) {
        console.error(`   ❌ Ошибка при вызове:`, error);
      }
    });
  }
  
  console.log(`=== Конец notifySubscribers ===\n`);
}

  subscribe(eventType: string, callback: Function): () => void {
    console.log(`Subscribing to: ${eventType}`);
    
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }

    this.listeners.get(eventType)!.add(callback);

    return () => {
      const listeners = this.listeners.get(eventType);
      if (listeners) {
        listeners.delete(callback);
      }
    };
  }

  async invoke(methodName: string, ...args: any[]): Promise<any> {
    if (!this.connection) {
      throw new Error("SignalR not connected");
    }

    if (this.connection.state !== "Connected") {
      throw new Error(
        `Cannot invoke method - connection state: ${this.connection.state}`
      );
    }

    try {
      return await this.connection.invoke(methodName, ...args);
    } catch (error) {
      console.error(`Error invoking method ${methodName}:`, error);
      throw error;
    }
  }

  async send(methodName: string, ...args: any[]): Promise<void> {
    await this.invoke(methodName, ...args);
  }

  async stream<T>(
    methodName: string,
    ...args: any[]
  ): Promise<IStreamResult<T>> {
    if (!this.connection) {
      throw new Error("SignalR not connected");
    }

    return this.connection.stream<T>(methodName, ...args);
  }

  async disconnect(): Promise<void> {
    this.isConnecting = false;

    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
    }

    this.listeners.clear();
    this.onConnectionChange?.(false);
  }

  getState(): string {
    return this.connection?.state || "Disconnected";
  }

  isConnected(): boolean {
    return this.connection?.state === "Connected";
  }

  getConnectionId(): string | null {
    return this.connection?.connectionId || null;
  }

  getReconnectAttempts(): number {
    return this.reconnectAttempts;
  }
}
