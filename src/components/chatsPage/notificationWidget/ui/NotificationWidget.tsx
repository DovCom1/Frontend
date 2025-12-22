import classes from "./NotificationWidget.module.css";
import Label from "../../../../shared/atoms/labels/Label";
import Button from "../../../../shared/atoms/buttons/Button";
import NotificationItem from "./NotificationItem";
import notificationItemClasses from "./NotificationItem.module.css";
import { useEffect, useState } from "react";
import { useInvites } from "../model/useInvites";
import { userState } from "../../../../entities/mainUser/model/UserState";

interface NotificationWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationWidget: React.FC<NotificationWidgetProps> = ({
  isOpen,
  onClose,
}) => {
  const { invites, acceptInvite, rejectInvite, totalCount } = useInvites();
  const [currentUserId, setCurrentUserId] = useState<string>("");

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userId = await userState.getUserId();
        setCurrentUserId(userId);
      } catch (err) {}
    };

    fetchUserId();
  }, []);

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
                      onClick={() => acceptInvite(invite.id, currentUserId)}
                      backgroundColor="#2A3FA7"
                      borderRadius="12px"
                      width="100px"
                      height="30px"
                    />
                    <Button
                      className={notificationItemClasses.rejectButton}
                      label={<Label text="Отклонить" />}
                      onClick={() => rejectInvite(invite.id, currentUserId)}
                      backgroundColor="#a1402eff"
                      borderRadius="12px"
                      width="100px"
                      height="30px"
                    />
                  </div>
                }
                caption={`${invite.senderName} хочет добавить вас в друзья`}
                avatarUrl={"/images/neuro_dove.png"}
                date={invite.createdAt}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationWidget;
