export interface MessageEntity {
  id: string;
  senderId: string;
  content: string;
  sentAt: string;
  editedAt?: string;
  deleted?: boolean;
}
