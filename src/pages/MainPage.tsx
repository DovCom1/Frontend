import Button from "../shared/atoms/buttons/Button";

import IconButton from "../shared/atoms/buttons/IconButton";
import Header from "../shared/organisms/Header"
import buttonClasses from "../shared/atoms/buttons/Button.module.css";
import MainPageButtons from "../shared/molecules/MainPageButtons";
export function MainPage() {
  return (
    <div className={"main-page-container"}>
        <Header />
        <main>
            <MainPageButtons />
            <Button className={buttonClasses.defaultButtonBlue} label="Войти" width="200px" />
          <Button className={buttonClasses.defaultButtonOrange}
            label="Войти/зарегистрироваться "
            icon="/icons/login.svg"
            iconPosition="right"
          />
          <IconButton
              className={`${buttonClasses.defaultButtonOrange}`}
              icon="/icons/login.svg"
            size="70px"
            iconSize="40px"
            onClick={() => console.log("Clicked!")}
          />

          <Button
              className={buttonClasses.defaultWarningButton}
            label="Опасное действие"
          />
          <Button
              className={buttonClasses.defaultButtonBlue} label="Недоступно" disabled={true}
          />
        </main>
    </div>
  );
}

export default MainPage;
