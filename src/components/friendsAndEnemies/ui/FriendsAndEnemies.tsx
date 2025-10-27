import React, { useState, useEffect } from "react";
import "./FriendsAndEnemies.css";
import { User } from "../../../features/editFriendsAndEnemies/api/userSearchApi";
import { userState } from "../../../entities/mainUser/model/UserState";
import {
  FriendsAndEnemiesApi,
  UsersResponse,
} from "../api/friendsAndEnamisApi";
import { EditFriendsAndEnemiesWidget } from "../../../features/editFriendsAndEnemies/ui/EditFriendsAndEnemiesWidget";
import Button from "../../../shared/atoms/buttons/Button";
import Label from "../../../shared/atoms/labels/Label";
import Icon from "../../../shared/atoms/icons/Icon";

export const FriendsAndEnemies: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"friends" | "enemies">("friends");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
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

  const handlePrevPage = () => {
    setOffset((prev) => Math.max(0, prev - limit));
  };

  const handleNextPage = () => {
    setOffset((prev) => prev + limit);
  };

  const toggleModal = () => {
    setShowAddModal(!showAddModal);
  };

  return (
    <div className="friends-enemies">
      <div className="friends-enemies__header">
        <div className="friends-enemies__tabs">
          <button
            className={`friends-enemies__tab ${
              activeTab === "friends" ? "friends-enemies__tab--active" : ""
            }`}
            onClick={() => {
              setActiveTab("friends");
              setOffset(0);
            }}
          >
            Друзья
          </button>
          <button
            className={`friends-enemies__tab ${
              activeTab === "enemies" ? "friends-enemies__tab--active" : ""
            }`}
            onClick={() => {
              setActiveTab("enemies");
              setOffset(0);
            }}
          >
            Враги
          </button>
        </div>

        <Button
          onClick={toggleModal}
          label={
            <Label text="Добавить нового юзера" color="white" fontSize="16px" />
          }
          icon={<Icon path={"/icons/search.svg"} />}
          labelPosition="left"
          width="250px"
          height="40px"
          borderRadius="20px"
          gap="10px"
          backgroundColor="#007bff"
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
                        src={user.avatarUrl}
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
                      {activeTab === "friends" ? (
                        <Button
                          onClick={() => {}}
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
                          onClick={() => {}}
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
    </div>
  );
};
