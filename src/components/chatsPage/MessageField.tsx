import classes from "./MessagesField.module.css";
import Message from "./Message";

const MessagesField = () => {
  return (
    <div className={classes.container}>
      <Message text={"Привет, мир!"} date={"3:33"} nickname={"Мегабро"} />
    </div>
  );
};

export default MessagesField;
