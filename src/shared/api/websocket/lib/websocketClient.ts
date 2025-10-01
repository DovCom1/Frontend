// shared/api/websocket/lib/websocket-client.ts
export class WebSocketClient {
  private socket: WebSocket | null = null;
  private listeners = new Map<string, Set<Function>>();

  constructor(private url: string) {}

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(this.url);

      this.socket.onopen = () => {
        console.log("WebSocket connected (read-only)");
        resolve();
      };

      this.socket.onmessage = (event) => {
        this.handleMessage(JSON.parse(event.data));
      };

      this.socket.onerror = (error) => {
        reject(error);
      };
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
  }
}
