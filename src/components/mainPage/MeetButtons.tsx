import React from "react";
import classes from "./MeetButtons.module.css";

import Label from "../../shared/atoms/labels/Label";
import LabeledIconButton from "../../shared/atoms/buttons/LabeledIconButton";
import Icon from "../../shared/atoms/icons/Icon";

const MeetButtons = () => {
  return (
    <div className={classes.container}>
      {/*<LabeledButton labelPosition={"top"} label={"text"} button={IconButton} />*/}
      <LabeledIconButton
        className={classes.buttonWrapper}
        icon={
          <Icon
            path={"/icons/linkBig.svg"}
            className={classes.buttonIconWrapper}
          />
        }
        labelPosition={"bottom"}
        label={
          <Label
            className={classes.buttonLabelWrapper}
            text={"Подключиться к видеовстрече"}
          />
        }
      />
      <LabeledIconButton
        className={classes.buttonWrapper}
        icon={
          <Icon
            path={"/icons/camWhite.svg"}
            className={classes.buttonIconWrapper}
          />
        }
        labelPosition={"bottom"}
        label={
          <Label
            className={classes.buttonLabelWrapper}
            text={"Создать видеовстречу"}
          />
        }
      />
    </div>
  );
};

export default MeetButtons;
