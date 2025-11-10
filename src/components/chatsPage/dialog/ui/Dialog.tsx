import DialogInner from "./DialogInner";
import { Chat } from "../../../../entities/chat/model/types/chat";
import classes from "./styles/Dialog.module.css";

export interface DialogProps {
  selectedChat?: Chat;
}

const Dialog: React.FC<DialogProps> = ({ selectedChat }) => {
  if (!selectedChat)
    return (
      <div className={`${classes.container} ${classes.messageContainer}`}>
        Выберите диалог
      </div>
    );
  return <DialogInner selectedChat={selectedChat} />;
};

export default Dialog;
