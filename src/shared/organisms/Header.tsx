import React from "react";
import headerClasses from "./Header.module.css";
import buttonClasses from "../atoms/buttons/Button.module.css";

import Button from "../atoms/buttons/Button";

const Header = () => {
    return <header>
        <div className={headerClasses.headerContainer}>
            <img src="/icons/logo.svg" className={headerClasses.logo}/>
            <Button className={buttonClasses.defaultButtonOrange}
                    label="Войти/зарегистрироваться "
                    icon="/icons/login.svg"
                    iconPosition="right"
                    borderRadius="15px"
            />
        </div>
    </header>
};

export default Header;
