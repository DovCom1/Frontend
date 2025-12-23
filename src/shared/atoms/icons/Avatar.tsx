import React from "react";
import Icon from "./Icon";

interface AvatarProps {
  path?: string;
  size?: string;
}

/**
 * Компонент аватарки пользователя
 */
const Avatar: React.FC<AvatarProps> = ({ path, size }) => {
  if (path === "default.jpg") {
    path = "/images/neuro_dove.png";
  }
  return (
    <Icon
      path={path || "/images/neuro_dove.png"}
      style={{ borderRadius: "50%", marginBottom: "15px" }}
      height={size}
      width={size}
    />
  );
};

export default Avatar;
