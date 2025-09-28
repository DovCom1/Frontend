import Button from "../shared/button/Button";
import IconButton from "../shared/button/IconButton";
import classes from "../shared/button/Button.module.css";
export function MainPage() {
  return (
    <div>
      <Button className={classes.defaultButtonBlue} label="Войти" width="200px" />
      <Button className={classes.defaultButtonOrange}
        label="Войти/зарегистрироваться "
        icon="/icons/login.svg"
        iconPosition="right"
      />
      <IconButton
          className={classes.defaultButtonOrange}
        icon="/icons/cameraBlack.svg"
        onClick={() => console.log("Clicked!")}
      />
      <IconButton
          className={`${classes.defaultButtonOrange}`}

          icon="/icons/login.svg"
        size="70px"
        iconSize="40px"
        onClick={() => console.log("Clicked!")}
      />
      <IconButton
          className={classes.defaultButtonBlue}
          icon="/icons/link.svg"
        onClick={() => console.log("Clicked!")}
      />
      <Button
          className={classes.defaultWarningButton}
        label="Опасное действие"
      />
      <Button
          className={classes.defaultButtonBlue} label="Недоступно" disabled={true}
      />
    </div>
  );
}

export default MainPage;
