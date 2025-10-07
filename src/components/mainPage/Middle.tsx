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
        width={"900px"}
        horizontalGap={"70px"}
        // className={}
        elements={[
          <Icon path={"/images/neuro_dove.png"} size={"400px"} />,
          <Label
            verticalAlign={"center"}
            color={"#fff"}
            width={"400px"}
            text={
              "Ваше пространство для общения.\nЗдесь встречаются ваши идеи, друзья и сообщества."
            }
            fontSize={"34px"}
          />,
        ]}
      />
    </div>
  );
};

export default Middle;
