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
          key={chat.id}
          chat={chat}
          isSelected={chat.id === selectedChatId}
          onSelect={() => onChatSelect(chat.id)}
        />
      ))}
    </div>
  );
};
