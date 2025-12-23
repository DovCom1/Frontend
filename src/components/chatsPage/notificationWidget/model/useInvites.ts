import { useEffect } from 'react';
import { useInviteStore } from './inviteStore';
import { useSignalRStore } from '../../../../shared/api/websocket/model/SignalRStore';

export const useInvites = () => {
  const { 
    invites, 
    setupSignalRSubscription, 
    acceptInvite, 
    rejectInvite 
  } = useInviteStore();
  
  const { client: signalRClient } = useSignalRStore();
  
  useEffect(() => {
    if (!signalRClient) return;
    
    const unsubscribe = setupSignalRSubscription(signalRClient);
    
    return unsubscribe;
  }, [signalRClient, setupSignalRSubscription]);
  
  
  return {
    // Все приглашения
    invites,
    
    // Методы
    acceptInvite,
    rejectInvite,
    
    totalCount: invites.length,
  };
};