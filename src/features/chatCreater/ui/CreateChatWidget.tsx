// features/chatCreater/ui/CreateChatWidget.tsx
import React, { useEffect, useState } from "react";
import { Modal } from "../../../shared/atoms/modal/Modal";
import buttonClasses from "../../../shared/atoms/buttons/Button.module.css";
import "./ChatCreaterWidget.css";
import { MultipleDropdown } from "../../../shared/atoms/dropdown/MultipleDropdown";
import Icon from "../../../shared/atoms/icons/Icon";
import { createIconTextOptions } from "../../../shared/atoms/dropdown/options/IconTextOption";
import { userState } from "../../../entities/mainUser/model/UserState";
import { FriendsAndEnemiesApi } from "../../../components/friendsAndEnemies/api/friendsAndEnamisApi";
import Button from "../../../shared/atoms/buttons/Button";
import Label from "../../../shared/atoms/labels/Label";
import { createChatApi } from "../api/CreateChatApi";

interface ChatCreaterWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateChat?: () => void; // Добавлен пропс
}

interface UseChatCreatorReturn {
  isOpen: boolean;
  openChatCreator: () => void;
  closeChatCreator: () => void;
}

export const useChatCreator = (): UseChatCreatorReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const openChatCreator = () => setIsOpen(true);
  const closeChatCreator = () => setIsOpen(false);

  return {
    isOpen,
    openChatCreator,
    closeChatCreator,
  };
};

export const ChatCreaterWidget: React.FC<ChatCreaterWidgetProps> = ({
  isOpen,
  onClose,
  onCreateChat,
}) => {
  const [userId, setCurrentUserId] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const [friendsOptions, setFriendsOptions] = useState<
    Array<{
      value: string;
      icon: React.ReactElement<typeof Icon>;
      text: string;
    }>
  >([]);

  // Очищаем выбранных пользователей при закрытии
  useEffect(() => {
    if (!isOpen) {
      setSelectedUsers([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const setCurrentUser = async () => {
      try {
        const userId = await userState.getUserId();
        setCurrentUserId(userId);
      } catch (error) {
        console.error("Ошибка получения ID пользователя:", error);
      }
    };
    setCurrentUser();
  }, []);

  useEffect(() => {
    const loadFriends = async () => {
      if (!userId) return;
      try {
        const response = await FriendsAndEnemiesApi.getFriends(userId, 0, 1000);
        const friends = response.data.map((user) => ({
          value: user.uid,
          icon: (
            <Icon
              path={user.avatarUrl || "/icons/base_dove.svg"}
              size="100px"
            />
          ),
          text: user.nickname,
        }));
        setFriendsOptions(friends);
      } catch (error) {
        console.error("Error getting friends:", error);
      }
    };

    loadFriends();
  }, [userId]);

  const handleUsersChange = (selectedValues: string[]) => {
    setSelectedUsers(selectedValues);
  };

  const handleCreateChat = async () => {
    try {
      console.log(
        "Создание чата с пользователями:",
        selectedUsers.concat(userId)
      );

      // Вызываем API создания чата
      const chatId = await createChatApi.createChat(selectedUsers);

      // Закрываем модальное окно
      onClose();

      // Очищаем выбранных пользователей
      setSelectedUsers([]);

      // Вызываем коллбэк, если он передан
      if (onCreateChat) {
        onCreateChat();
      }

      console.log("Чат успешно создан с ID:", chatId);
    } catch (error) {
      console.error("Ошибка при создании чата:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="body">
        <MultipleDropdown
          label="Участники"
          options={createIconTextOptions(friendsOptions)}
          value={selectedUsers}
          onChange={handleUsersChange}
        />
        <Button
          className={buttonClasses.defaultButtonOrange}
          label={<Label text={"создать чат"} />}
          height="40px"
          borderRadius="15px"
          onClick={handleCreateChat}
          disabled={selectedUsers.length === 0}
        />
      </div>
    </Modal>
  );
};
