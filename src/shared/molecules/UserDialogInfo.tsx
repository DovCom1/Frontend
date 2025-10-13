import React from "react";
import Icon from "../atoms/icons/Icon";
import classes from "./UserDialogInfo.module.css";
import Label from "../atoms/labels/Label";
import buttonClasses from "../atoms/buttons/Button.module.css";

interface UserDialogInfoProps {
  avatarSrc: string;
  userName: string;
  uuid: string;
  onClick?: () => void;
}

const UserDialogInfo: React.FC<UserDialogInfoProps> = ({
  avatarSrc,
  userName,
  uuid,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${buttonClasses.customButton} ${classes.container}`}
    >
      <Icon className={classes.avatarWrapper} path={avatarSrc} />
      <div className={classes.labelsContainer}>
        <Label className={classes.nicknameWrapper} text={userName}></Label>
        <Label className={classes.uuidWrapper} text={uuid}></Label>
      </div>
    </button>
  );
};

export default UserDialogInfo;
