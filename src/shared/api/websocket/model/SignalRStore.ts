import { create } from "zustand";
import { SignalRClient } from "../lib/SignalRClient";

interface SignalRState {
  client: SignalRClient | null;
  isConnected: boolean;
  isConnecting: boolean;
  reconnectAttempts: number;
  connectionId: string | null;
  lastError: string | null;

  connect: (token?: string) => Promise<void>;
  disconnect: () => Promise<void>;
  subscribe: (eventType: string, callback: Function) => () => void;
  invoke: (methodName: string, ...args: any[]) => Promise<any>;
  send: (methodName: string, ...args: any[]) => Promise<void>;
}

export const useSignalRStore = create<SignalRState>((set, get) => ({
  client: null,
  isConnected: false,
  isConnecting: false,
  reconnectAttempts: 0,
  connectionId: null,
  lastError: null,

  connect: async () => {
    const { client, isConnecting } = get();

    if (isConnecting) {
      return;
    }

    if (client && client.isConnected()) {
      console.log("SignalR already connected");
      return;
    }

    set({ isConnecting: true, lastError: null });

    const newClient = new SignalRClient(
      (process.env.REACT_APP_API_BASE_URL &&
        process.env.REACT_APP_API_BASE_URL + "/user/hub") ||
        "http://localhost:8080/user/hub"
    );
    // Настраиваем обработчики
    newClient.onConnectionChange = (isConnected: boolean) => {
      set({
        isConnected,
        isConnecting: false,
        connectionId: newClient.getConnectionId(),
        reconnectAttempts: newClient.getReconnectAttempts(),
      });
    };

    newClient.onReconnecting = () => {
      set({
        isConnected: false,
        reconnectAttempts: newClient.getReconnectAttempts(),
      });
    };

    newClient.onReconnected = (connectionId) => {
      set({
        isConnected: true,
        connectionId,
        reconnectAttempts: 0,
      });
    };

    newClient.onError = (error: Error) => {
      set({
        lastError: error.message,
        isConnecting: false,
      });
    };

    try {
      await newClient.connect();
      set({
        client: newClient,
        isConnected: true,
        isConnecting: false,
        connectionId: newClient.getConnectionId(),
        reconnectAttempts: 0,
        lastError: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      set({
        lastError: `Connection failed: ${errorMessage}`,
        isConnecting: false,
      });
      throw error;
    }
  },

  disconnect: async () => {
    const { client } = get();
    if (client) {
      await client.disconnect();
      set({
        client: null,
        isConnected: false,
        isConnecting: false,
        connectionId: null,
        reconnectAttempts: 0,
      });
    }
  },

  subscribe: (eventType: string, callback: Function) => {
    const { client } = get();
    if (!client) {
      throw new Error("SignalR not connected. Call connect() first.");
    }

    return client.subscribe(eventType, callback);
  },

  invoke: async (methodName: string, ...args: any[]) => {
    const { client, isConnected } = get();

    if (!client || !isConnected) {
      throw new Error("Cannot invoke method - SignalR not connected");
    }

    return await client.invoke(methodName, ...args);
  },

  send: async (methodName: string, ...args: any[]) => {
    const { client, isConnected } = get();

    if (!client || !isConnected) {
      throw new Error("Cannot send message - SignalR not connected");
    }

    await client.send(methodName, ...args);
  },
}));
