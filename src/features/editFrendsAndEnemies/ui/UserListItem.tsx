import React from "react";
import { User } from "../api/userSearchApi";
import { useAuthWidgetStore } from "../model/useAuthWidgetStore";

interface UserListItemProps {
  user: User;
}

export const UserListItem: React.FC<UserListItemProps> = ({ user }) => {
  const { addNewFriend, addNewEnemy, loading } = useAuthWidgetStore();

  const handleAddFriend = async () => {
    try {
      await addNewFriend(user.id);
      alert(`Пользователь ${user.nickname} добавлен в друзья!`);
    } catch (error) {
      alert("Ошибка при добавлении в друзья");
    }
  };

  const handleAddEnemy = async () => {
    try {
      await addNewEnemy(user.id);
      alert(`Пользователь ${user.nickname} добавлен во враги!`);
    } catch (error) {
      alert("Ошибка при добавлении во враги");
    }
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      marginBottom: "8px",
      backgroundColor: "#f9f9f9"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img 
          src={user.avatarUrl} 
          alt={user.nickname}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFit: "cover"
          }}
        />
        <div>
          <div style={{ fontWeight: "bold" }}>{user.nickname}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>UID: {user.uid}</div>
          <div style={{ fontSize: "12px", color: user.status === "В сети" ? "green" : "#666" }}>
            {user.status}
          </div>
        </div>
      </div>
      
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={handleAddFriend}
          disabled={loading}
          style={{
            padding: "6px 12px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1
          }}
        >
          В друзья
        </button>
        <button
          onClick={handleAddEnemy}
          disabled={loading}
          style={{
            padding: "6px 12px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1
          }}
        >
          Во враги
        </button>
      </div>
    </div>
  );
};