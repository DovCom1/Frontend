import classes from "./MessageInput.module.css";
import IconButton from "../../shared/atoms/buttons/IconButton";
import Icon from "../../shared/atoms/icons/Icon";
import TextArea from "../../shared/atoms/text-area/TextArea";

const MessageInput = () => {
  return (
    <div className={classes.container}>
      <TextArea
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
