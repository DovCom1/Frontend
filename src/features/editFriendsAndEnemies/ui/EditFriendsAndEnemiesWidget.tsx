import React, { useState, useEffect, useCallback } from "react";
import { Modal } from "../../../shared/atoms/modal/Modal";
import { Search } from "../../../shared/atoms/input-fields/search/Search";
import { useAuthWidgetStore } from "../model/EditFriendsAndEnemiesStore";
import { userState } from "../../../entities/mainUser/model/UserState";
import { UserListItem } from "./UserListItem";
import "./EditFriendsAndEnemies.css";

export const EditFriendsAndEnemiesWidget: React.FC = () => {
  const [isOpen, setModalState] = useState(true);
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");

  const {
    users,
    loading,
    error,
    getUsersByUid,
    getUsersByName,
    clearUsers,
    setCurrentUserId,
  } = useAuthWidgetStore();

  // Установить ID текущего пользователя
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
  }, [setCurrentUserId]);

  const handleUidSearch = useCallback(
    (value: string) => {
      setUid(value);
      getUsersByUid(value);
    },
    [getUsersByUid]
  );

  const handleNameSearch = useCallback(
    (value: string) => {
      console.log("handleNameSearch", value);
      setName(value);
      getUsersByName(value);
    },
    [getUsersByName]
  );

  function closeAll(): void {
    setModalState(false);
    clearUsers();
    setUid("");
    setName("");
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeAll}
      maxWidth={"800px"}
      height={"500px"}
    >
      <div className="edit-friends-enemies">
        <div className="edit-friends-enemies__search-container">
          <div className="edit-friends-enemies__search-wrapper">
            <Search onClick={handleNameSearch} placeholder="Поиск по имени" />
          </div>
          <div className="edit-friends-enemies__search-wrapper">
            <Search onClick={handleUidSearch} placeholder="Поиск по UID" />
          </div>
        </div>

        {/* {error && <div className="edit-friends-enemies__error">{error}</div>} */}

        {loading && (
          <div className="edit-friends-enemies__loading">Загрузка...</div>
        )}

        <div className="edit-friends-enemies__users-list">
          {users.length > 0
            ? users.map((user) => <UserListItem key={user.id} user={user} />)
            : !loading && (
                <div className="edit-friends-enemies__no-users">
                  Пользователи не найдены
                </div>
              )}
        </div>
      </div>
    </Modal>
  );
};
