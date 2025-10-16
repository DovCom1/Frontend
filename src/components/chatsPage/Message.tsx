import classes from "./Message.module.css";
import Label from "../../shared/atoms/labels/Label";

export interface MessageProps {
  text: string;
  date: string;
  nickname: string;
}

const Message: React.FC<MessageProps> = ({ text, date, nickname }) => {
  return (
    <div className={classes.container}>
      <Label
        className={`${classes.fontStyleWrapper} ${classes.nicknameWrapper}`}
        text={nickname}
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
