import React from "react";
import { Chat } from "../../../../entities/chat/model/types/chat";
import Button from "../../../../shared/atoms/buttons/Button";
import Label from "../../../../shared/atoms/labels/Label";
import Icon from "../../../../shared/atoms/icons/Icon";

interface ChatCardProps {
  chat: Chat;
  isSelected: boolean;
  onSelect: (chat: Chat) => void;
}

export const ChatCard: React.FC<ChatCardProps> = ({
  chat,
  isSelected,
  onSelect,
}) => {
  const handleClick = () => {
    onSelect(chat);
  };

  return (
    <div
      style={{
        padding: "8px",
        marginBottom: "8px",
        backgroundColor: isSelected ? "#4a4a4a" : "transparent",
        borderRadius: "8px",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <Button
        label={<Label text={chat.name} color={"#E4E3E8"} />}
        icon={
          <Icon
            path={chat.avatarUrl || "/icons/base_dove.svg"}
            height={"45px"}
            width={"45px"}
            style={{ borderRadius: "50%" }}
          />
        }
        gap={"10px"}
        labelPosition={"right"}
      />
    </div>
  );
};
