import { create } from 'zustand';
import { SignalRClient } from '../../../../shared/api/websocket/lib/SignalRClient';
import { friendsApi } from '../api/NotificationApi';

export interface Invite {
  senderName: string;
  id: string;
  senderId: string;
  receiverId: string;
  receiverName: string;
  createdAt: string;
  type: 'friend' | 'chat' | 'group';
  status: 'pending' | 'accepted' | 'rejected';
}

interface InviteStore {
  invites: Invite[];

  setupSignalRSubscription: (signalRClient: SignalRClient) => () => void;
  
  acceptInvite: (inviteId: string, userId: string) => Promise<void>;
  rejectInvite: (inviteId: string, userId: string) => Promise<void>;
}

export const useInviteStore = create<InviteStore>((set, get) => ({
  invites: [],
  
  setupSignalRSubscription: (signalRClient) => {
    const handleInviteEvent = (event: any) => {
      console.log('📨 Получено событие приглашения:', event);
      
      const invite: Invite = {
        id: event.SenderId,
        senderId: event.SenderId,
        receiverId: event.ReceiverId,
        senderName: event.senderName,
        receiverName: event.receiverName,
        createdAt: event.createdAt,
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
  
  acceptInvite: async (inviteId: string, userId: string) => {
    console.log(`Принимаем приглашение: ${inviteId}`);
    
    friendsApi.acceptFriendRequest(userId, inviteId);

    set((state) => ({
      invites: state.invites.filter(inv => inv.id !== inviteId),
      isLoading: false
    }));
    
  },
  
  // Отклонить приглашение
  rejectInvite: async (inviteId: string, userId: string) => {
    console.log(`Отклоняем приглашение: ${inviteId}`);
    
    friendsApi.rejectFriendRequest(userId, inviteId);

    set((state) => ({
      invites: state.invites.filter(inv => inv.id !== inviteId),
      isLoading: false
    }));
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