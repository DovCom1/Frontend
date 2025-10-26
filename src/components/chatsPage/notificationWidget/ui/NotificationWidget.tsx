import classes from "./NotificationWidget.module.css";
import Label from "../../../../shared/atoms/labels/Label";
import Button from "../../../../shared/atoms/buttons/Button";
import NotificationItem from "./NotificationItem";
import notificationItemClasses from "./NotificationItem.module.css";

interface NotificationWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationWidget: React.FC<NotificationWidgetProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;
  return (
    <div className={classes.overlay} onClick={onClose}>
      <div className={classes.modal}>
        <Label text={"Уведомления"} className={classes.subtitle} />
        <div className={classes.notificationsContainer}>
          <NotificationItem
            button={
              <Button
                className={notificationItemClasses.buttonWrapper}
                label={<Label text={"Добавить в друзья"} />}
              />
            }
            caption={"Nickname хочет добавить вас в друзья"}
            avatarUrl={"/images/neuro_dove.png"}
            date={"10.10.25 11:11"}
          />
          <NotificationItem
            button={
              <Button
                className={notificationItemClasses.buttonWrapper}
                label={<Label text={"Добавить в друзья"} />}
              />
            }
            caption={"Nickname хочет добавить вас в друзья"}
            avatarUrl={"/images/neuro_dove.png"}
            date={"10.10.25 11:11"}
          />
          <NotificationItem
            button={
              <Button
                className={notificationItemClasses.buttonWrapper}
                label={<Label text={"Добавить в друзья"} />}
              />
            }
            caption={"Nickname хочет добавить вас в друзья"}
            avatarUrl={"/images/neuro_dove.png"}
            date={"10.10.25 11:11"}
          />
          <NotificationItem
            button={
              <Button
                className={notificationItemClasses.buttonWrapper}
                label={<Label text={"Добавить в друзья"} />}
              />
            }
            caption={"Nickname хочет добавить вас в друзья"}
            avatarUrl={"/images/neuro_dove.png"}
            date={"10.10.25 11:11"}
          />
          <NotificationItem
            button={
              <Button
                className={notificationItemClasses.buttonWrapper}
                label={<Label text={"Добавить в друзья"} />}
              />
            }
            caption={"Nickname хочет добавить вас в друзья"}
            avatarUrl={"/images/neuro_dove.png"}
            date={"10.10.25 11:11"}
          />
          <NotificationItem
            button={
              <Button
                className={notificationItemClasses.buttonWrapper}
                label={<Label text={"Добавить в друзья"} />}
              />
            }
            caption={"Nickname хочет добавить вас в друзья"}
            avatarUrl={"/images/neuro_dove.png"}
            date={"10.10.25 11:11"}
          />
          {/*<Button*/}
          {/*  label={<Label text={"Показать все"} />}*/}
          {/*  className={classes.button}*/}
          {/*/>*/}
        </div>
      </div>
    </div>
  );
};

export default NotificationWidget;
