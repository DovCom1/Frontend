import { create } from "zustand";
import { WebSocketClient } from "../lib/websocketClient";

interface WebSocketState {
  client: WebSocketClient | null;
  isConnected: boolean;
  connect: (url: string) => Promise<void>;
  disconnect: () => void;
  subscribe: (eventType: string, callback: Function) => () => void;
}

export const useWebSocketStore = create<WebSocketState>((set, get) => {
  return {
    client: null,
    isConnected: false,

    connect: async (url: string) => {
      const client = new WebSocketClient(url);
      await client.connect();
      set({ client, isConnected: true });
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
  };
});
