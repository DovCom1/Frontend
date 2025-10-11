import React from 'react';
import classes from './Modal.module.css';
import IconButton from '../buttons/IconButton';
import Icon from '../icons/Icon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
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
        {(
          <div className={classes.header}>
            <IconButton icon={<Icon path='/icons/arrowLeftWhite.svg' size='80' />} onClick={onClose} />
          </div>
        )}
        <div className={classes.content}>
          {children}
        </div>
      </div>
    </div>
  );
};
