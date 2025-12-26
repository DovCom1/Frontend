import { SignalingMessage, SignalingMessageType } from '../api/signaling';
import { useSignalRStore } from '../../../shared/api/websocket/model/SignalRStore'; // Путь к вашему стору
import { userState } from '../../../entities/mainUser/model/UserState';

class SignalingService {
    // Внутренняя шина событий для компонентов (useWebRTC подписывается сюда)
    private listeners: Map<string, Function[]> = new Map();
    private unsubscribeSignalR: (() => void) | null = null;

    /**
     * Инициализация подписки на SignalR.
     * В отличие от WS, мы не открываем соединение сами, 
     * мы просто подписываемся на события уже открытого SignalR.
     */
    connect() {
        if (this.unsubscribeSignalR) return; // Уже подписаны

        const store = useSignalRStore.getState();

        // Если SignalR еще не подключен, можно попробовать подключить
        // или просто ждать, пока приложение само его поднимет.
        // Обычно SignalR поднимается глобально в Layout/App.
        
        // Подписываемся на события "ReceiveSignal" из SignalRClient
        try {
            this.unsubscribeSignalR = store.subscribe("ReceiveSignal", (message: SignalingMessage) => {
                console.log(`📡 SignalR received: ${message.type} from ${message.from}`);
                this.emit(message.type, message);
            });
            console.log('✅ SignalingService hooked into SignalR');
        } catch (e) {
            console.error('Failed to subscribe to SignalR. Make sure SignalR is connected.', e);
        }
    }

    /**
     * Отправка сообщения через SignalR Hub
     */
    async send(type: SignalingMessageType, payload: SignalingMessage['payload'], to?: string) {
        const store = useSignalRStore.getState();

        // Проверка соединения
        if (!store.isConnected || !store.client) {
            console.warn('⚠️ SignalR not connected, cannot send WebRTC signal', type);
            // Можно добавить логику очереди сообщений, если нужно
            return;
        }

        const currentUserId = userState.getUserIdSync();
        if (!currentUserId) {
            console.error(`Attempt to send ${type} without authorized user!`);
            return;
        }

        const message: SignalingMessage = {
            type,
            from: currentUserId,
            to,
            payload
        };

        try {
            // Вызываем метод на Бэкенде. Назовем его 'SendSignal'.
            // Убедитесь, что бэкенд ожидает именно этот метод и структуру!
            await store.invoke('SendSignal', message);
        } catch (error) {
            console.error(`❌ Failed to send signal ${type}:`, error);
        }
    }

    // --- Стандартная реализация Event Emitter (без изменений) ---

    on(type: SignalingMessageType, callback: (msg: SignalingMessage) => void) {
        if (!this.listeners.has(type)) {
            this.listeners.set(type, []);
        }
        this.listeners.get(type)?.push(callback);
    }

    off(type: SignalingMessageType, callback: (msg: SignalingMessage) => void) {
        const callbacks = this.listeners.get(type);
        if (callbacks) {
            this.listeners.set(type, callbacks.filter(cb => cb !== callback));
        }
    }

    private emit(type: string, message: SignalingMessage) {
        this.listeners.get(type)?.forEach(cb => cb(message));
    }

    disconnect() {
        // Отписываемся от SignalR, но НЕ разрываем само соединение (оно общее)
        if (this.unsubscribeSignalR) {
            this.unsubscribeSignalR();
            this.unsubscribeSignalR = null;
        }
        this.listeners.clear();
        console.log('🛑 SignalingService unhooked');
    }
}

export const signalingService = new SignalingService();
