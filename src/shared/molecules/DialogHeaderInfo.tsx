import React from "react";
import Icon from "../atoms/icons/Icon";
import classes from "./styles/UserDialogInfo.module.css";
import Label from "../atoms/labels/Label";
import buttonClasses from "../atoms/buttons/Button.module.css";
import Avatar from "../atoms/icons/Avatar";

interface DialogHeaderInfoProps {
  avatarSrc: string;
  userName: string;
  uuid: string;
  onClick?: () => void;
}

const DialogHeaderInfo: React.FC<DialogHeaderInfoProps> = ({
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
      {/* <Icon className={classes.avatarWrapper} path={avatarSrc} /> */}
      <Avatar path={avatarSrc} size="35px" />
      <div className={classes.labelsContainer}>
        <Label className={classes.nicknameWrapper} text={userName}></Label>
        <Label className={classes.uuidWrapper} text={uuid}></Label>
      </div>
    </button>
  );
};

export default DialogHeaderInfo;
