import { create } from 'zustand';
import { SignalRClient } from '../../../../shared/api/websocket/lib/SignalRClient';

export interface Invite {
  id: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  receiverName: string;
  createdAt: Date;
  type: 'friend' | 'chat' | 'group';
  status: 'pending' | 'accepted' | 'rejected';
}

interface InviteStore {
  invites: Invite[];

  setupSignalRSubscription: (signalRClient: SignalRClient) => () => void;
  
  acceptInvite: (inviteId: string) => Promise<void>;
  rejectInvite: (inviteId: string) => Promise<void>;
}

export const useInviteStore = create<InviteStore>((set, get) => ({
  invites: [],
  
  setupSignalRSubscription: (signalRClient) => {
    const handleInviteEvent = (event: any) => {
      console.log('📨 Получено событие приглашения:', event);
      
      const invite: Invite = {
        id: `${event.SenderId}_${event.ReceiverId}_${Date.now()}`,
        senderId: event.SenderId,
        receiverId: event.ReceiverId,
        senderName: event.SenderName,
        receiverName: event.ReceiverName,
        createdAt: new Date(event.CreatedAt),
        type: 'friend',
        status: 'pending',
      };
      
      set((state) => ({
        invites: [...state.invites, invite]
      }));
      
      showNotification(invite);
    };
    
    const unsubscribe = signalRClient.subscribe(
      'Invite', 
      handleInviteEvent
    );
    
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  },
  
  acceptInvite: async (inviteId: string) => {
    console.log(`Принимаем приглашение: ${inviteId}`);
    
    set((state) => ({
      invites: state.invites.map((invite) =>
        invite.id === inviteId 
          ? { ...invite, status: 'accepted' }
          : invite
      ),
    }));
  },
  
  // Отклонить приглашение
  rejectInvite: async (inviteId: string) => {
    console.log(`Отклоняем приглашение: ${inviteId}`);
    
    // Обновляем статус в хранилище
    set((state) => ({
      invites: state.invites.map((invite) =>
        invite.id === inviteId 
          ? { ...invite, status: 'rejected' }
          : invite
      ),
    }));
    
    setTimeout(() => {
      set((state) => ({
        invites: state.invites.filter((invite) => invite.id !== inviteId),
      }));
    }, 3000);
    
    // Здесь можно добавить API вызов к серверу
    // try {
    //   await api.rejectInvite(inviteId);
    // } catch (error) {
    //   console.error('Ошибка при отклонении приглашения:', error);
    // }
  },
}));

// Вспомогательная функция для уведомлений
function showNotification(invite: Invite) {
  if (!('Notification' in window)) return;
  
  if (Notification.permission === 'granted') {
    new Notification('Новое приглашение!', {
      body: `${invite.senderName} хочет добавить вас в друзья`,
      icon: '/images/neuro_dove.png',
    });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification('Новое приглашение!', {
          body: `${invite.senderName} хочет добавить вас в друзья`,
          icon: '/images/neuro_dove.png',
        });
      }
    });
  }
}