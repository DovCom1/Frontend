import React, { useState, useEffect, useCallback } from "react";
import { Modal } from "../../../shared/atoms/modal/Modal";
import { Search } from "../../../shared/atoms/input-fields/search/Search";
import { useAuthWidgetStore } from "../model/useAuthWidgetStore";
import { userState } from "../../../entities/mainUser/model/UserState";
import { UserListItem } from "./UserListItem";

export const EditFrendsAndEnemiesWidget: React.FC = () => {
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
    setCurrentUserId 
  } = useAuthWidgetStore();

   // Установить ID текущего пользователя
  useEffect(() => {
    const setCurrentUser = async () => {
      try {
        const userId = await userState.getUserId();
        setCurrentUserId(userId);
      } catch (error) {
        console.error("Ошибка получения ID пользователя:", error);
        // Можно установить состояние ошибки в store
      }
    };

    setCurrentUser();
  }, [setCurrentUserId]);

  const handleUidSearch = useCallback((value: string) => {
    setUid(value);
    getUsersByUid(value);
  }, [getUsersByUid]);

  const handleNameSearch = useCallback((value: string) => {
    setName(value);
    getUsersByName(value);
  }, [getUsersByName]);

  function closeAll(): void {
    setModalState(false);
    clearUsers();
    setUid("");
    setName("");
  }

  return (
    <Modal isOpen={isOpen} onClose={closeAll}>
      <div style={{ padding: "20px", minWidth: "400px" }}>
        <div style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          marginBottom: "15px"
        }}>
          <div style={{ flex: 1 }}>
            <Search 
              value={name} 
              onChange={handleNameSearch}
              placeholder="Поиск по имени" 
            />
          </div>
          <div style={{ flex: 1 }}>
            <Search 
              value={uid} 
              onChange={handleUidSearch}
              placeholder="Поиск по UID" 
            />
          </div>
        </div>

        {error && (
          <div style={{
            color: "red",
            padding: "10px",
            backgroundColor: "#ffe6e6",
            borderRadius: "4px",
            marginBottom: "10px"
          }}>
            {error}
          </div>
        )}

        {loading && (
          <div style={{ textAlign: "center", padding: "20px" }}>
            Загрузка...
          </div>
        )}

        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          {users.length > 0 ? (
            users.map(user => (
              <UserListItem key={user.id} user={user} />
            ))
          ) : (
            !loading && (
              <div style={{ 
                textAlign: "center", 
                color: "#666", 
                padding: "20px" 
              }}>
                Пользователи не найдены
              </div>
            )
          )}
        </div>
      </div>
    </Modal>
  );
};