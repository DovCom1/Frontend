import classes from "./styles/Dialog.module.css";
import DialogHeader from "./inners/DialogHeader";
import MessagesField from "./inners/MessageField";
import MessageInput from "./inners/MessageInput";
import { Chat } from "../../../../entities/chat/model/types/chat";
import React, { useEffect } from "react";
import { useDialog } from "../model/dialog";

const DialogInner: React.FC<{ selectedChat: Chat }> = ({ selectedChat }) => {
  const { messages, username, loading, error, loadMessages, handleWrite } =
    useDialog(selectedChat);

  useEffect(() => {
    loadMessages();
  }, [selectedChat]);

  if (error) {
    return (
      <div
        className={`${classes.container} ${classes.messageContainer} ${classes.errorMessageContainer}`}
      >
        {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`${classes.container} ${classes.messageContainer}`}>
        Загрузка...
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <DialogHeader selectedChat={selectedChat} />
      <MessagesField
        selectedChat={selectedChat}
        messages={messages}
        username={username}
      />
      <MessageInput onWrite={handleWrite} />
    </div>
  );
};

export default DialogInner;
