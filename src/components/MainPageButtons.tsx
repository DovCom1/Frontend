import React from "react";
import classes from "./MainPageButtons.module.css";

import IconButton from "../shared/atoms/buttons/IconButton";
import buttonClasses from "../shared/atoms/buttons/Button.module.css";
import Label from "../shared/atoms/labels/Label";
import LabeledIconButton from "../shared/atoms/buttons/LabeledIconButton";
import Icon from "../shared/atoms/icons/Icon";

const MainPageButtons = () => {
  return (
    <div className={classes.container}>
      {/*<LabeledButton labelPosition={"top"} label={"text"} button={IconButton} />*/}
      <LabeledIconButton
        icon={<Icon path={"/icons/linkBig.svg"} size="70px" />}
        labelPosition={"bottom"}
        label={
          <Label
            text={"Подключиться к видеовстрече"}
            color={"#fff"}
            width={"156px"}
          />
        }
      />
      <LabeledIconButton
        icon={<Icon path={"/icons/camWhite.svg"} size="70px" />}
        labelPosition={"bottom"}
        label={
          <Label text={"Создать видеовстречу"} color={"#fff"} width={"156px"} />
        }
      />
    </div>
  );
};

export default MainPageButtons;
