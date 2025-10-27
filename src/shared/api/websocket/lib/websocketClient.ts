export class WebSocketClient {
  private socket: WebSocket | null = null;
  private listeners = new Map<string, Set<Function>>();
  private token: string | null = null;
  private readonly url: string;

  constructor() {
    // URL определяется внутри класса
    this.url = process.env.WS_URL || "ws://localhost:3000/ws";
  }

  setToken(token: string) {
    this.token = token;
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Добавляем токен в URL как query параметр
        console.log(this.token);
        const wsUrl: string = this.token
          ? `${this.url}?token=${encodeURIComponent(this.token)}`
          : this.url;

        console.log(wsUrl);
        this.socket = new WebSocket(wsUrl);

        this.socket.onopen = () => {
          console.log("WebSocket connected with token");
          resolve();
        };

        this.socket.onmessage = (event) => {
          this.handleMessage(JSON.parse(event.data));
        };

        this.socket.onerror = (error) => {
          console.error("WebSocket error:", error);
          reject(error);
        };

        this.socket.onclose = (event) => {
          console.log("WebSocket disconnected:", event.code, event.reason);
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  private handleMessage(data: any) {
    const listeners = this.listeners.get(data.type) || new Set();
    listeners.forEach((listener) => listener(data.payload));
  }

  subscribe(eventType: string, callback: Function): () => void {
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

  disconnect() {
    this.socket?.close();
    this.listeners.clear();
    this.token = null;
  }

  getReadyState(): number {
    return this.socket?.readyState || WebSocket.CLOSED;
  }
}
