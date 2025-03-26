import { FC, ReactNode } from 'react';
import { FaMinus } from 'react-icons/fa';
import styles from './Widget.module.scss';

interface ChatWidgetHeaderProps {
  customHeader?: ReactNode;
  headerTitle: string;
  headerColor?: string;
  toggleWidget: () => void;
  headerClassName?: string;
}

export const ChatWidgetHeader: FC<ChatWidgetHeaderProps> = ({
  customHeader,
  headerTitle,
  headerColor,
  toggleWidget,
  headerClassName
}) => {
  // Header style with background color
  const headerStyle = headerColor ? { backgroundColor: headerColor } : undefined;
  
  if (customHeader) {
    return <>{customHeader}</>;
  }
  
  return (
    <div 
      className={`${styles.widgetHeader} ${headerClassName || ''}`}
      style={headerStyle}
    >
      <h3>{headerTitle}</h3>
      <button 
        className={styles.minimizeButton}
        onClick={toggleWidget}
        aria-label="Minimize chat widget"
      >
        <FaMinus />
      </button>
    </div>
  );
}; 