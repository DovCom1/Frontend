import classes from "./NotificationItem.module.css";
import Button from "../../../../shared/atoms/buttons/Button";
import React from "react";
import Icon from "../../../../shared/atoms/icons/Icon";

interface NotificationItemProps {
  button: React.ReactElement<typeof Button>;
  caption: string;
  avatarUrl: string;
  date: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  button,
  caption,
  avatarUrl,
  date,
}) => {
  return (
    <div className={classes.notificationContainer}>
      <Icon className={classes.avatarWrapper} path={avatarUrl} />
      <div className={classes.contentContainer}>
        <p className={classes.captionWrapper}>{caption}</p>
        {button}
        <p className={classes.dateWrapper}>{date}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
