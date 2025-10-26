import classes from "./DialogHeader.module.css";
import UserDialogInfo from "../../../../shared/molecules/UserDialogInfo";
import Icon from "../../../../shared/atoms/icons/Icon";
import IconButton from "../../../../shared/atoms/buttons/IconButton";
import { DialogProps } from "./Dialog";

const DialogHeader: React.FC<DialogProps> = ({ selectedChat }) => {
  return (
    <div className={classes.container}>
      <UserDialogInfo
        avatarSrc={"/images/neuro_dove.png"}
        userName={selectedChat?.name || "Мегабро"}
        uuid={selectedChat?.uuid || "phoenixbro"}
      />
      <IconButton icon={<Icon path={"/icons/white_phone.svg"} />} />
    </div>
  );
};

export default DialogHeader;
