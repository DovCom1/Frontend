import { create } from "zustand";
import { WebSocketClient } from "../lib/WebsocketClient";

interface WebSocketState {
  client: WebSocketClient | null;
  isConnected: boolean;
  connect: (token?: string) => Promise<void>;
  disconnect: () => void;
  subscribe: (eventType: string, callback: Function) => () => void;
  setToken: (token: string) => void;
}

export const useWebSocketStore = create<WebSocketState>((set, get) => ({
  client: null,
  isConnected: false,

  connect: async (token?: string) => {
    const client = new WebSocketClient();

    // Устанавливаем токен если он передан
    if (token) {
      client.setToken(token);
    }

    try {
      await client.connect();
      set({ client, isConnected: true });
    } catch (error) {
      console.error("WebSocket connection failed:", error);
      throw error;
    }
  },

  disconnect: () => {
    const { client } = get();
    client?.disconnect();
    set({ client: null, isConnected: false });
  },

  subscribe: (eventType: string, callback: Function) => {
    const { client } = get();
    if (!client) throw new Error("WebSocket not connected");
    return client.subscribe(eventType, callback);
  },

  setToken: (token: string) => {
    const { client } = get();
    if (client) {
      client.setToken(token);
    }
  },
}));
