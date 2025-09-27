import Button from "../shared/Button/Button";
import IconButton from "../shared/IconButton";
export function MainPage() {
  return (
    <div>
      <Button label="Войти" width="200px" borderRadius="15px" />
      <Button
        label="Войти/зарегистрироваться "
        icon="/icons/login.svg"
        iconPosition="right"
        borderRadius="15px"
        backgroundColor="#FF9500"
        textColor="#1E1E22"
        width="300px"
      />
      <IconButton
        icon="/icons/cameraBlack.svg"
        backgroundColor="#FF9500"
        onClick={() => console.log("Clicked!")}
      />
      <IconButton
        icon="/icons/login.svg"
        size="70px"
        iconSize="40px"
        backgroundColor="#FF9500"
        onClick={() => console.log("Clicked!")}
      />
      <IconButton
        icon="/icons/link.svg"
        onClick={() => console.log("Clicked!")}
      />
      <Button
        label="Опасное действие"
        backgroundColor="#E81414"
        textColor="#fff"
        width="100%"
      />
      <Button label="Недоступно" disabled={true} />
    </div>
  );
}

export default MainPage;
