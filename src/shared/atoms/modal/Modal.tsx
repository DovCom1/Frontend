import React from 'react';
import classes from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={classes.overlay} onClick={handleOverlayClick}>
      <div className={classes.modal}>
        {title && (
          <div className={classes.header}>
            <h2 className={classes.title}>{title}</h2>
            <button className={classes.closeButton} onClick={onClose}>
              ×
            </button>
          </div>
        )}
        <div className={classes.content}>
          {children}
        </div>
      </div>
    </div>
  );
};
