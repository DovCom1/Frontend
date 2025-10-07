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
        icon={<Icon path={"/icons/linkBig.svg"} size="79px" />}
        labelPosition={"bottom"}
        label={
          <Label
            text={"Подключиться к видеовстрече"}
            color={"#fff"}
            width={"156px"}
            fontSize={"18px"}
          />
        }
      />
      <LabeledIconButton
        icon={<Icon path={"/icons/camWhite.svg"} size="79px" />}
        labelPosition={"bottom"}
        label={
          <Label
            text={"Создать видеовстречу"}
            color={"#fff"}
            width={"156px"}
            fontSize={"18px"}
          />
        }
      />
    </div>
  );
};

export default MeetButtons;
