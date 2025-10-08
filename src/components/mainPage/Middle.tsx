import Grid from "../../shared/molecules/Grid";
import Icon from "../../shared/atoms/icons/Icon";
import Label from "../../shared/atoms/labels/Label";
import classes from "./Middle.module.css";

const Middle = () => {
  return (
    <div className={classes.container}>
      <Grid
        cols={2}
        rows={1}
        horizontalGap={"85px"}
        elements={[
          <Icon path={"/images/neuro_dove.png"} size={"450px"} scale />,
          <Label
            verticalAlign={"center"}
            color={"#fff"}
            width={"400px"}
            text={
              "Ваше пространство для общения.\nЗдесь встречаются ваши идеи, друзья и сообщества."
            }
            fontSize={"38px"}
            scale
          />,
        ]}
      />
    </div>
  );
};

export default Middle;
