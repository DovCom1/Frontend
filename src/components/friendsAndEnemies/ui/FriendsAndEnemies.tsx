import React, { useState, useEffect } from "react";
import "./FriendsAndEnemies.css";
import { UserMainInfo } from "../../../features/editFriendsAndEnemies/api/userSearchApi";
import { userState } from "../../../entities/mainUser/model/UserState";
import {
  FriendsAndEnemiesApi,
  UsersResponse,
} from "../api/friendsAndEnamisApi";
import { EditFriendsAndEnemiesWidget } from "../../../features/editFriendsAndEnemies/ui/EditFriendsAndEnemiesWidget";
import Button from "../../../shared/atoms/buttons/Button";
import Label from "../../../shared/atoms/labels/Label";
import Icon from "../../../shared/atoms/icons/Icon";
import IconButton from "../../../shared/atoms/buttons/IconButton";
import { Modal } from "../../../shared/atoms/modal/Modal";

interface Props {
  onClose: () => void;
  onChatCreated: () => void;
}

export const FriendsAndEnemies: React.FC<Props> = ({
  onClose,
  onChatCreated,
}) => {
  const [activeTab, setActiveTab] = useState<"friends" | "enemies">("friends");
  const [users, setUsers] = useState<UserMainInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showMessageModal, setShowMessageModal] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserMainInfo | null>(null);
  const [message, setMessage] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const limit = 5;

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userId = await userState.getUserId();
        setCurrentUserId(userId);
      } catch (err) {
        setError("Ошибка получения ID пользователя");
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (currentUserId) {
      fetchUsers();
    }
  }, [activeTab, currentUserId, offset]);

  const fetchUsers = async () => {
    if (!currentUserId) return;

    setLoading(true);
    setError(null);

    try {
      let response: UsersResponse;

      if (activeTab === "friends") {
        response = await FriendsAndEnemiesApi.getFriends(
          currentUserId,
          offset,
          limit
        );
      } else {
        response = await FriendsAndEnemiesApi.getEnemies(
          currentUserId,
          offset,
          limit
        );
      }

      setUsers(response.data);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки данных");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!currentUserId) return;

    try {
      if (activeTab === "friends") {
        await FriendsAndEnemiesApi.deleteFriend(currentUserId, userId);
      } else {
        await FriendsAndEnemiesApi.deleteEnemy(currentUserId, userId);
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      setTotal((prevTotal) => prevTotal - 1);

      if (users.length === 1 && offset > 0) {
        setOffset((prevOffset) => Math.max(0, prevOffset - limit));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка при удалении");
    }
  };

  const handleSendMessageClick = (user: UserMainInfo) => {
    setSelectedUser(user);
    setShowMessageModal(true);
    setMessage("");
  };

  const handleSendMessage = async () => {
    if (!selectedUser || !message.trim() || !currentUserId) return;

    const messageData = {
      userId: currentUserId,
      receiverId: selectedUser.id,
      content: message,
    };

    try {
      await FriendsAndEnemiesApi.makeFirstMessage(messageData);

      onChatCreated();

      console.log(
        `Сообщение отправлено для ${selectedUser.nickname}: ${message}`
      );

      setShowMessageModal(false);
      setMessage("");
      setSelectedUser(null);
    } catch (err) {
      setError("Ошибка при отправке сообщения");
      console.error(err);
    }
  };

  const handlePrevPage = () => {
    setOffset((prev) => Math.max(0, prev - limit));
  };

  const handleNextPage = () => {
    setOffset((prev) => prev + limit);
  };

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  return (
    <div className="friends-enemies">
      <div className="friends-enemies__header">
        <div className="friends-enemies__tabs">
          <IconButton
            onClick={() => {
              onClose();
            }}
            icon={<Icon path={"/icons/arrowLeftWhite.svg"} />}
          />
          <Button
            onClick={() => {
              setActiveTab("friends");
              setOffset(0);
            }}
            label={
              <Label
                text="Друзья"
                color={activeTab === "friends" ? "white" : "grey"}
                fontSize="18px"
              />
            }
            labelPosition="top"
            icon={
              <Icon
                path={
                  activeTab === "friends"
                    ? "/icons/LineWhite.svg"
                    : "/icons/LineGrey.svg"
                }
              />
            }
            width="100px"
            height="40px"
            gap="8px"
          />
          <Button
            onClick={() => {
              setActiveTab("enemies");
              setOffset(0);
            }}
            label={
              <Label
                text="Враги"
                color={activeTab === "enemies" ? "white" : "grey"}
                fontSize="18px"
              />
            }
            labelPosition="top"
            icon={
              <Icon
                path={
                  activeTab === "enemies"
                    ? "/icons/LineWhite.svg"
                    : "/icons/LineGrey.svg"
                }
              />
            }
            width="100px"
            height="40px"
            gap="8px"
          />
        </div>

        <Button
          onClick={toggleAddModal}
          label={
            <Label text="Добавить нового юзера" color="white" fontSize="16px" />
          }
          icon={<Icon path={"/icons/search.svg"} size="18px" />}
          labelPosition="left"
          width="250px"
          height="45px"
          borderRadius="20px"
          gap="7px"
          backgroundColor="#2A3FA7"
        />
      </div>

      {error && <div className="friends-enemies__error">{error}</div>}

      {loading ? (
        <div className="friends-enemies__loading">Загрузка...</div>
      ) : (
        <div className="friends-enemies__content">
          {users.length > 0 ? (
            <>
              <div className="friends-enemies__list">
                {users.map((user) => (
                  <div key={user.id} className="friends-enemies__user-card">
                    <div className="friends-enemies__user-info">
                      <img
                        src={user.avatarUrl || "/images/neuro_dove.png"}
                        alt={user.nickname}
                        className="friends-enemies__user-avatar"
                      />
                      <div className="friends-enemies__user-details">
                        <div className="friends-enemies__user-nickname">
                          {user.nickname}
                        </div>
                        <div className="friends-enemies__user-uid">
                          @{user.uid}
                        </div>
                        <div
                          className={`friends-enemies__user-status ${
                            user.status === "В сети"
                              ? "friends-enemies__user-status--online"
                              : ""
                          }`}
                        >
                          {user.status}
                        </div>
                      </div>
                    </div>
                    <div className="friends-enemies__user-actions">
                      <Button
                        label={
                          <Label
                            text={"Написать"}
                            fontSize={"14px"}
                            color={"#F6F6F6"}
                          />
                        }
                        icon={
                          <Icon
                            path={"/icons/createChatWhite.svg"}
                            size={"18px"}
                          />
                        }
                        labelPosition={"right"}
                        backgroundColor={"#2A3FA7"}
                        width={"130px"}
                        height={"40px"}
                        onClick={() => handleSendMessageClick(user)}
                        borderRadius="20px"
                        gap="6px"
                      />
                      {activeTab === "friends" ? (
                        <Button
                          onClick={() => handleDeleteUser(user.id)}
                          label={
                            <Label
                              text="Удалить из друзей"
                              color="white"
                              fontSize="14px"
                            />
                          }
                          labelPosition="left"
                          width="170px"
                          height="40px"
                          borderRadius="20px"
                          backgroundColor="#2A2B31"
                        />
                      ) : (
                        <Button
                          onClick={() => handleDeleteUser(user.id)}
                          label={
                            <Label
                              text="Удалить из врагов"
                              color="white"
                              fontSize="14px"
                            />
                          }
                          labelPosition="left"
                          width="170px"
                          height="40px"
                          borderRadius="20px"
                          backgroundColor="#2A2B31"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="friends-enemies__pagination">
                <Button
                  onClick={handlePrevPage}
                  disabled={offset === 0}
                  label={<Label text="Назад" color="white" fontSize="14px" />}
                  labelPosition="left"
                  width="100px"
                  height="40px"
                  borderRadius="20px"
                  backgroundColor="#2A2B31"
                />
                <span className="friends-enemies__pagination-info">
                  {offset + 1}-{Math.min(offset + limit, total)} из {total}
                </span>
                <Button
                  onClick={handleNextPage}
                  disabled={offset + limit >= total}
                  label={<Label text="Вперед" color="white" fontSize="14px" />}
                  labelPosition="left"
                  width="100px"
                  height="40px"
                  borderRadius="20px"
                  backgroundColor="#2A2B31"
                />
              </div>
            </>
          ) : (
            <div className="friends-enemies__no-users">
              {activeTab === "friends"
                ? "Список друзей пуст"
                : "Список врагов пуст"}
            </div>
          )}
        </div>
      )}

      {showAddModal && <EditFriendsAndEnemiesWidget />}

      {/* Модальное окно для написания сообщения */}
      <Modal
        isOpen={showMessageModal}
        onClose={() => {
          setShowMessageModal(false);
          setSelectedUser(null);
          setMessage("");
        }}
        title={
          selectedUser
            ? `Сообщение для ${selectedUser.nickname}`
            : "Написать сообщение"
        }
        width="400px"
        height="350px"
      >
        <div className="friends-enemies__message-modal">
          <div className="friends-enemies__message-input-container">
            <textarea
              className="friends-enemies__message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Введите сообщение..."
              rows={4}
              maxLength={500}
            />
            <div className="friends-enemies__message-counter">
              {message.length}/500
            </div>
          </div>

          <div className="friends-enemies__message-actions">
            <Button
              onClick={() => {
                setShowMessageModal(false);
                setSelectedUser(null);
                setMessage("");
              }}
              label={<Label text="Отмена" color="white" fontSize="14px" />}
              width="120px"
              height="40px"
              borderRadius="20px"
              backgroundColor="#2A2B31"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              label={<Label text="Отправить" color="white" fontSize="14px" />}
              width="120px"
              height="40px"
              borderRadius="20px"
              backgroundColor="#2A3FA7"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
