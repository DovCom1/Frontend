import React from "react";
import { Chat } from "../../../../entities/chat/model/types/chat";
import { ChatCard } from "./ChatCard";
import "./ChatsList.css";

interface ChatsListProps {
  chats: Chat[];
  selectedChatId: string | null;
  onChatSelect: (chatId: string) => void;
}

export const ChatsList: React.FC<ChatsListProps> = ({
  chats,
  selectedChatId,
  onChatSelect,
}) => {
  return (
    <div className="chats-list">
      {chats.map((chat) => (
        <ChatCard
          key={chat.chatId}
          chat={chat}
          isSelected={chat.chatId === selectedChatId}
          onSelect={() => onChatSelect(chat.chatId)}
        />
      ))}
    </div>
  );
};
