import classes from "./DialogHeader.module.css";
import UserDialogInfo from "../../shared/molecules/UserDialogInfo";
import Icon from "../../shared/atoms/icons/Icon";
import IconButton from "../../shared/atoms/buttons/IconButton";

const DialogHeader = () => {
  return (
    <div className={classes.container}>
      <UserDialogInfo
        avatarSrc={"/images/neuro_dove.png"}
        userName={"Мегабро"}
        uuid={"@phoenixpro"}
      />
      <IconButton icon={<Icon path={"/icons/white_phone.svg"} />} />
    </div>
  );
};

export default DialogHeader;
