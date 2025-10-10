import classes from "./ChatsPage.module.css";
import Dialog from "../../components/chatsPage/Dialog";

const ChatsPage = () => {
  return (
    <div className={classes.container}>
      {/*Заглушка под левое меню*/}
      <div
        style={{ width: "20%", minHeight: "100vh", background: "#2A3FA7" }}
      ></div>
      <Dialog />
    </div>
  );
};

export default ChatsPage;
