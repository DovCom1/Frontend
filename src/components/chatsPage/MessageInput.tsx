import classes from "./MessageInput.module.css";
import { TextInput } from "../../shared/atoms/input-fields/TextInput";
import IconButton from "../../shared/atoms/buttons/IconButton";
import Icon from "../../shared/atoms/icons/Icon";

const MessageInput = () => {
  return (
    <div className={classes.container}>
      <TextInput
        className={classes.messageInput}
        placeholder={"Введите текст сообщения"}
      />
      <div className={classes.sendButtonContainer}>
        <IconButton icon={<Icon path={"/icons/send.svg"} />} />
      </div>
    </div>
  );
};

export default MessageInput;
