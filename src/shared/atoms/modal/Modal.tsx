import React from "react";
import classes from "./Modal.module.css";
import IconButton from "../buttons/IconButton";
import Icon from "../icons/Icon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string | number; // Ширина модального окна
  height?: string | number; // Высота модального окна
  maxWidth?: string | number; // Максимальная ширина
  maxHeight?: string | number; // Максимальная высота
  title?: string; // Заголовок модального окна
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  width,
  height,
  maxWidth,
  maxHeight,
  title,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalStyles: React.CSSProperties = {
    width: width || "90%",
    height: height || "auto",
    maxWidth: maxWidth || "500px",
    maxHeight: maxHeight || "90vh",
  };

  return (
    <div className={classes.overlay} onClick={handleOverlayClick}>
      <div className={classes.modal} style={modalStyles}>
        <div className={classes.header}>
          {title && <h2 className={classes.title}>{title}</h2>}
          <IconButton
            icon={<Icon path="/icons/arrowLeftWhite.svg" size="80" />}
            onClick={onClose}
          />
        </div>
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  );
};
