import classes from "./Dialog.module.css";
import DialogHeader from "./DialogHeader";
import MessagesField from "./MessageField";
import MessageInput from "./MessageInput";

const Dialog = () => {
  return (
    <div className={classes.container}>
      <DialogHeader />
      <MessagesField />
      <MessageInput />
    </div>
  );
};

export default Dialog;
