import classes from "./styles/Message.module.css";
import Label from "../atoms/labels/Label";

export interface MessageProps {
  text: string;
  date?: string;
  name?: string;
  from?: boolean;
}

const Message: React.FC<MessageProps> = ({ text, date, name, from }) => {
  return (
    <div
      className={`${classes.container} ${from ? classes.incoming : classes.outgoing}`}
    >
      <Label
        className={`${classes.fontStyleWrapper} ${classes.nicknameWrapper}`}
        text={name || "user"}
      />
      <div className={classes.contentContainer}>
        <Label
          className={`${classes.fontStyleWrapper} ${classes.contentTextWrapper}`}
          text={text}
        />
        <Label
          className={`${classes.fontStyleWrapper} ${classes.contentDateWrapper}`}
          text={date || "0:00"}
        />
      </div>
    </div>
  );
};

export default Message;
