import React from "react";
import headerClasses from "./Header.module.css";
import buttonClasses from "../shared/atoms/buttons/Button.module.css";

import Button from "../shared/atoms/buttons/Button";
import Label from "../shared/atoms/labels/Label";
import LinkButton from "../shared/atoms/buttons/LinkButton";
import Icon from "../shared/atoms/icons/Icon";

const Header = () => {
    return <header>
        <div className={headerClasses.headerContainer}>
            <LinkButton label={<Label text={"DovCom"} color={"#fff"} fontSize={"34px"} />}
                        icon={<Icon path={"/icons/logo.svg"} size={"70px"}/>}
                        url={"/"}
                        labelPosition={"right"}
            />

            <Button className={buttonClasses.defaultButtonOrange}
                    label={<Label text={"Войти/зарегистрироваться"}/>}
                    icon={<Icon path={"/icons/login.svg"}/>}
                    labelPosition="left"
                    borderRadius="15px"
            />
        </div>
    </header>
};

export default Header;
