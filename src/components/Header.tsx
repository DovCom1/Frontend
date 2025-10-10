import headerClasses from "./Header.module.css";
import buttonClasses from "../shared/atoms/buttons/Button.module.css";
import { useAuthWidgetStore } from "../features/auth/model/AuthWidgetStore";
import Button from "../shared/atoms/buttons/Button";
import Label from "../shared/atoms/labels/Label";
import LinkButton from "../shared/atoms/buttons/LinkButton";
import Icon from "../shared/atoms/icons/Icon";

const Header = () => {
  const { openLogin } = useAuthWidgetStore();
  return (
    <header>
      <div className={headerClasses.headerContentWrapper}>
        <LinkButton
          className={headerClasses.logoButtonWrapper}
          label={
            <Label className={headerClasses.logoLabelWrapper} text={"DovCom"} />
          }
          icon={
            <Icon
              className={headerClasses.logoIconWrapper}
              path={"/icons/base_dove.svg"}
            />
          }
          url={"/"}
          labelPosition={"right"}
        />

        <Button
          className={`${buttonClasses.defaultButtonOrange} ${headerClasses.authButtonWrapper}`}
          label={
            <Label
              className={headerClasses.authButtonLabelWrapper}
              text={"Войти/зарегистрироваться"}
            />
          }
          icon={
            <Icon
              className={headerClasses.authButtonIconWrapper}
              path={"/icons/login.svg"}
            />
          }
          onClick={openLogin}
          labelPosition="left"
        />
      </div>
    </header>
  );
};

export default Header;
