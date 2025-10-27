import classes from "./Message.module.css";
import Label from "../../../../shared/atoms/labels/Label";

export interface MessageProps {
  text: string;
  date: string;
  name: string;
  from?: boolean;
}

const Message: React.FC<MessageProps> = ({ text, date, name, from }) => {
  return (
    <div
      className={`${classes.container} ${from ? classes.incoming : classes.outgoing}`}
    >
      <Label
        className={`${classes.fontStyleWrapper} ${classes.nicknameWrapper}`}
        text={name}
      />
      <div className={classes.contentContainer}>
        <Label
          className={`${classes.fontStyleWrapper} ${classes.contentTextWrapper}`}
          text={text}
        />
        <Label
          className={`${classes.fontStyleWrapper} ${classes.contentDateWrapper}`}
          text={date}
        />
      </div>
    </div>
  );
};

export default Message;
