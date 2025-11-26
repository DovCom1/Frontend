import classes from "../styles/DialogHeader.module.css";
import DialogHeaderInfo from "../../../../../shared/molecules/DialogHeaderInfo";
import Icon from "../../../../../shared/atoms/icons/Icon";
import IconButton from "../../../../../shared/atoms/buttons/IconButton";
import { DialogProps } from "../Dialog";

const DialogHeader: React.FC<DialogProps> = ({ selectedChat }) => {
  // Нужно сделать запрос для получерия uuid
  return (
    <div className={classes.container}>
      <DialogHeaderInfo
        avatarSrc={selectedChat?.avatarUrl || "/images/neuro_dove.png"}
        userName={selectedChat?.name || "Username"}
        uuid={"@empty"}
      />
      <IconButton icon={<Icon path={"/icons/white_phone.svg"} />} />
    </div>
  );
};

export default DialogHeader;
