import classes from "./MessageInput.module.css";
import IconButton from "../../../../shared/atoms/buttons/IconButton";
import Icon from "../../../../shared/atoms/icons/Icon";
import TextArea from "../../../../shared/atoms/text-area/TextArea";
import React, { useState } from "react";

interface MessageInputProps {
  onWrite: (text: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onWrite }) => {
  const [text, setText] = useState("");

  const handleButtonClick = () => {
    if (text.trim()) {
      onWrite(text);
      setText("");
    }
  };

  return (
    <div className={classes.container}>
      <TextArea
        className={classes.messageInput}
        placeholder={"Введите текст сообщения"}
        value={text}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setText(e.target.value)
        }
        onEnterPress={handleButtonClick}
      />
      <div className={classes.sendButtonContainer}>
        <IconButton
          icon={<Icon path={"/icons/send.svg"} />}
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
};

export default MessageInput;
