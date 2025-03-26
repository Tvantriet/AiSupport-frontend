import { FC } from 'react';
import { FaComments } from 'react-icons/fa';
import styles from './Widget.module.scss';

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
      className={`${styles.widgetButton} ${isOpen ? styles.hidden : ''} ${buttonClassName || ''}`}
      onClick={toggleWidget}
      aria-label="Open chat widget"
    >
      <FaComments />
      <span>{buttonText}</span>
    </button>
  );
}; 