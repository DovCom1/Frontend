import { useEffect, useState } from "react";
import { getUser } from "../api/userApi";
import { User } from "../../../../shared/types/User";
import Icon from "../../../../shared/atoms/icons/Icon";
import "./UserRepresentation.css";
import Label from "../../../../shared/atoms/labels/Label";
import Button from "../../../../shared/atoms/buttons/Button";
import Avatar from "../../../../shared/atoms/icons/Avatar";

interface Props {
  onClose: () => void;
  userId: string;
}

const calculateAge = (birthDateString: string): number => {
  const birthDate = new Date(birthDateString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const UserRepresentation: React.FC<Props> = ({ onClose, userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUser(userId)
      .then(setUser)
      .catch((err) => setError("Failed to fetch user"))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  const age = calculateAge(user.dateOfBirth);
  const formattedDate = formatDate(user.dateOfBirth);

  return (
    <div className="container">
      <div className="user-representation-header">
        <Avatar path={user.avatarUrl} size={"140px"} />
        <Label text={user.nickname} fontSize={"24px"} color={"#F6F6F6"} />
        <Label text={"@" + user.uid} fontSize={"12px"} color={"#60636A"} />
        <Label
          text={user.status}
          fontSize={"12px"}
          color={user.status === "В сети" ? "green" : "#60636A"}
        />
        {/* <Button
          label={
            <Label text={"Написать"} fontSize={"14px"} color={"#F6F6F6"} />
          }
          icon={<Icon path={"/icons/createChatWhite.svg"} size={"18px"} />}
          labelPosition={"right"}
          backgroundColor={"#2A3FA7"}
          width={"130px"}
          height={"23px"}
          onClick={() => {}}
          borderRadius="12px"
          gap="6px"
        /> */}
      </div>
      <div className="user-representation-main">
        <div>
          <Label text={"Возраст"} fontSize={"14px"} color={"#60636A"} />
          <Label text={`${age} лет`} fontSize={"12px"} color={"#F6F6F6"} />
        </div>

        <div>
          <Label text={"Пол"} fontSize={"14px"} color={"#60636A"} />
          <Label text={user.gender} fontSize={"12px"} color={"#F6F6F6"} />
        </div>

        <div>
          <Label text={"Дата рождения"} fontSize={"14px"} color={"#60636A"} />
          <Label
            text={`${formattedDate}`}
            fontSize={"12px"}
            color={"#F6F6F6"}
          />
        </div>
      </div>
    </div>
  );
};
