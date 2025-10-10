import Icon from "../../shared/atoms/icons/Icon";
import Label from "../../shared/atoms/labels/Label";
import classes from "./Middle.module.css";

const Middle = () => {
  return (
    <div className={classes.container}>
      <Icon className={classes.iconWrapper} path={"/images/neuro_dove.png"} />
      <Label
        className={classes.labelWrapper}
        text={
          "Ваше пространство для общения.\nЗдесь встречаются ваши идеи, друзья и сообщества."
        }
      />
    </div>
  );
};

export default Middle;
