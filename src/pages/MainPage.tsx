import Button from "../shared/atoms/buttons/Button";

import IconButton from "../shared/atoms/buttons/IconButton";
import Header from "../components/Header";
import buttonClasses from "../shared/atoms/buttons/Button.module.css";
import MainPageButtons from "../components/MainPageButtons";
import LinkButton from "../shared/atoms/buttons/LinkButton";
import Label from "../shared/atoms/labels/Label";
import Icon from "../shared/atoms/icons/Icon";
import { AuthWidgetsProvider } from "../features/auth/ui/AuthWidgetsProvider";
import { useAuthWidgetStore } from "../features/auth/model/AuthWidgetStore";
export function MainPage() {
  const { openLogin, openRegister } = useAuthWidgetStore();
  return (
    <div className={"main-page-container"}>
      <Header />
      <LinkButton
        label={<Label text={"Перейди по ссылке!!!"} color={"#fff"} />}
        url={"https://ai.nsu.ru/projects/dovcom/time_entries"}
      />
      <main>
        <MainPageButtons />
        <Button
          className={buttonClasses.defaultButtonBlue}
          label={<Label text={"Кнопка"} />}
          width="200px"
        />
        <Button
          className={buttonClasses.defaultButtonOrange}
          label={<Label text={"Войти"} />}
          icon={<Icon path="/icons/login.svg" />}
          labelPosition="right"
          onClick={openLogin}
        />
        <IconButton
          className={`${buttonClasses.defaultButtonOrange}`}
          icon={<Icon path="/icons/login.svg" size={"40px"} />}
          size="70px"
          onClick={() => console.log("Clicked!")}
        />
        <Button
          className={buttonClasses.defaultWarningButton}
          label={<Label text={"Опасное действие"} />}
        />
        <Button
          className={buttonClasses.defaultButtonBlue}
          label={<Label text={"Недоступно"} />}
          disabled={true}
        />
        <AuthWidgetsProvider />
      </main>
    </div>
  );
}

export default MainPage;
