import { FC, ReactNode } from 'react';
import { useGlobalChat } from '../../context/ChatContext';
import { FaMinus, FaExchangeAlt } from 'react-icons/fa';
import styles from './ChatWidget.module.scss';

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
  const { currentProduct, clearProduct } = useGlobalChat();
  
  const headerStyle = headerColor ? { backgroundColor: headerColor } : undefined;
  
  // If customHeader is provided, use it
  if (customHeader) {
    return (
      <div
        className={`${styles.widgetHeader} ${headerClassName || ''}`}
        style={headerStyle}
      >
        {customHeader}
      </div>
    );
  }
  
  // Otherwise, render our default header
  return (
    <div
      className={`${styles.widgetHeader} ${headerClassName || ''}`}
      style={headerStyle}
    >
      <div className={styles.widgetHeaderContent}>
        <h3>
          {currentProduct ? currentProduct.name : headerTitle}
        </h3>
        <div>
          {currentProduct && (
            <button
              onClick={clearProduct}
              className={styles.switchProductButton}
              aria-label="Switch product"
              title="Switch product"
            >
              <FaExchangeAlt />
            </button>
          )}
          <button
            onClick={toggleWidget}
            className={styles.minimizeButton}
            aria-label="Minimize chat"
            title="Minimize chat"
          >
            <FaMinus />
          </button>
        </div>
      </div>
    </div>
  );
}; 