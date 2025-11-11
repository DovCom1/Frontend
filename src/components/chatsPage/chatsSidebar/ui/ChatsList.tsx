import React from "react";
import { Chat } from "../../../../entities/chat/model/types/chat";
import { ChatCard } from "./ChatCard";
import "./ChatsList.css";

interface ChatsListProps {
  chats: Chat[];
  selectedChat: Chat | null;
  onChatSelect: (chat: Chat) => void;
}

export const ChatsList: React.FC<ChatsListProps> = ({
  chats,
  selectedChat,
  onChatSelect,
}) => {
  return (
    <div className="chats-list">
      {chats.map((chat) => (
        <ChatCard
          key={chat.id}
          chat={chat}
          isSelected={chat.id === selectedChat?.id}
          onSelect={() => onChatSelect(chat)}
        />
      ))}
    </div>
  );
};
