import React from "react";
import headerClasses from "./Header.module.css";
import buttonClasses from "../shared/atoms/buttons/Button.module.css";

import Button from "../shared/atoms/buttons/Button";
import Label from "../shared/atoms/labels/Label";
import LinkButton from "../shared/atoms/buttons/LinkButton";
import Icon from "../shared/atoms/icons/Icon";

const Header = () => {
  return (
    <header className={headerClasses.header}>
      <div className={headerClasses.headerContainer}>
        <LinkButton
          label={<Label text={"DovCom"} color={"#fff"} fontSize={"24px"} />}
          icon={
            <Icon
              path={"/icons/base_dove.svg"}
              height={"43px"}
              width={"51px"}
            />
          }
          gap={"10px"}
          url={"/"}
          labelPosition={"right"}
        />

        <Button
          className={buttonClasses.defaultButtonOrange}
          label={<Label text={"Войти/зарегистрироваться"} fontSize={"18px"} />}
          icon={<Icon path={"/icons/login.svg"} size={"22px"} />}
          width={"323px"}
          height={"42px"}
          labelPosition="left"
          borderRadius="15px"
        />
      </div>
    </header>
  );
};

export default Header;
