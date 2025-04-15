import { FC } from 'react';
import styles from './ChatWidget.module.scss';

interface ChatWidgetButtonProps {
  isOpen: boolean;
  toggleWidget: () => void;
  buttonText: string;
  buttonClassName?: string;
}

export const ChatWidgetButton: FC<ChatWidgetButtonProps> = ({
  isOpen,
  toggleWidget,
  buttonText,
  buttonClassName
}) => {
  return (
    <button
      className={`${styles.widgetButton} ${buttonClassName || ''} ${isOpen ? styles.hidden : ''}`}
      onClick={toggleWidget}
      aria-label={buttonText}
    >
      {buttonText}
    </button>
  );
}; 