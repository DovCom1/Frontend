import React from "react";
import { UserMainInfo } from "../api/userSearchApi";
import { useAuthWidgetStore } from "../model/EditFriendsAndEnemiesStore";
import Button from "../../../shared/atoms/buttons/Button";
import Label from "../../../shared/atoms/labels/Label";
import "./UserListItem.css";

interface UserListItemProps {
  user: UserMainInfo;
}

export const UserListItem: React.FC<UserListItemProps> = ({ user }) => {
  const { addNewFriend, addNewEnemy, loading } = useAuthWidgetStore();

  const handleAddFriend = async () => {
    try {
      await addNewFriend(user.id);
    } catch (error) {
      alert("Ошибка при добавлении в друзья");
    }
  };

  const handleAddEnemy = async () => {
    try {
      await addNewEnemy(user.id);
    } catch (error) {
      alert("Ошибка при добавлении во враги");
    }
  };

  return (
    <div className="user-list-item">
      <div className="user-list-item__info">
        <img
          src={user.avatarUrl || "/images/neuro_dove.png"}
          alt={user.nickname}
          className="user-list-item__avatar"
        />
        <div className="user-list-item__details">
          <div className="user-list-item__nickname">{user.nickname}</div>
          <div className="user-list-item__uid">@{user.uid}</div>
          <div
            className={`user-list-item__status ${
              user.status === "В сети" ? "user-list-item__status--online" : ""
            }`}
          >
            {user.status}
          </div>
        </div>
      </div>

      <div className="user-list-item__actions">
        <Button
          onClick={handleAddFriend}
          disabled={loading}
          label={
            <Label text="Добавить в друзья" color="white" fontSize="14px" />
          }
          labelPosition="left"
          width="170px"
          height="40px"
          borderRadius="20px"
          backgroundColor="#2A2B31"
        />
        <Button
          onClick={handleAddEnemy}
          disabled={loading}
          label={
            <Label text="Добавить во враги" color="white" fontSize="14px" />
          }
          labelPosition="left"
          width="200px"
          height="40px"
          borderRadius="20px"
          backgroundColor="#2A2B31"
        />
      </div>
    </div>
  );
};
