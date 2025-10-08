import React from "react";
import headerClasses from "./Header.module.css";
import buttonClasses from "../shared/atoms/buttons/Button.module.css";

import Button from "../shared/atoms/buttons/Button";
import Label from "../shared/atoms/labels/Label";
import LinkButton from "../shared/atoms/buttons/LinkButton";
import Icon from "../shared/atoms/icons/Icon";

const Header = () => {
  return (
    <header>
      <div className={headerClasses.headerContainer}>
        <LinkButton
          label={<Label text={"DovCom"} color={"#fff"} fontSize={"26px"} />}
          icon={<Icon path={"/icons/base_dove.svg"} width={"66px"} scale />}
          gap={"10px"}
          url={"/"}
          labelPosition={"right"}
        />

        <Button
          className={buttonClasses.defaultButtonOrange}
          label={
            <Label text={"Войти/зарегистрироваться"} fontSize={"20px"} scale />
          }
          icon={<Icon path={"/icons/login.svg"} size={"22px"} />}
          width={"380px"}
          height={"43px"}
          labelPosition="left"
          borderRadius="15px"
          scale
        />
      </div>
    </header>
  );
};

export default Header;
