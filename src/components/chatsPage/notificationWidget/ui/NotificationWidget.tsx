import classes from "./NotificationWidget.module.css";
import Label from "../../../../shared/atoms/labels/Label";
import Button from "../../../../shared/atoms/buttons/Button";
import NotificationItem from "./NotificationItem";
import notificationItemClasses from "./NotificationItem.module.css";
import { useEffect } from "react";
import { useInvites } from "../model/useInvites";

interface NotificationWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationWidget: React.FC<NotificationWidgetProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    invites,
    acceptInvite,
    rejectInvite,
    totalCount,
  } = useInvites();

  // Форматирование даты
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(2);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  if (!isOpen) return null;

  return (
    <div className={classes.overlay} onClick={onClose}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <Label
          text={`Уведомления (${totalCount})`}
          className={classes.subtitle}
        />

        <div className={classes.notificationsContainer}>
          {invites.length === 0 ? (
            <div className={classes.emptyState}>
              <Label text="Нет новых уведомлений" />
            </div>
          ) : (
            invites.map((invite) => (
              <NotificationItem
                key={invite.id}
                button={
                  <div className={notificationItemClasses.buttonsContainer}>
                    <Button
                      className={notificationItemClasses.acceptButton}
                      label={<Label text="Принять" />}
                      onClick={() => acceptInvite(invite.id)}
                    />
                    <Button
                      className={notificationItemClasses.rejectButton}
                      label={<Label text="Отклонить" />}
                      onClick={() => rejectInvite(invite.id)}
                    />
                  </div>
                }
                caption={`${invite.senderName} хочет добавить вас в друзья`}
                avatarUrl={"/images/neuro_dove.png"}
                date={formatDate(invite.createdAt)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationWidget;
