import { FC, ReactNode, useState, useCallback } from 'react';
import { useGlobalChat } from '../../context/ChatContext';
import { ChatWidgetButton } from './ChatWidgetButton';
import { ChatWidgetContent } from './ChatWidgetContent';
import styles from './ChatWidget.module.scss';

export interface ChatWidgetProps {
  initialOpen?: boolean;
  buttonText?: string;
  headerTitle?: string;
  emptyStateText?: string;
  initialSuggestions?: string[];
  customHeader?: ReactNode;
  customFooter?: ReactNode;
  customEmptyState?: ReactNode;
  buttonClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  headerColor?: string;
  sendButtonColor?: string;
  userMessageColor?: string;
  userMessageTextColor?: string;
  onOpen?: () => void;
  onClose?: () => void;
  onReset?: () => void;
}

export const ChatWidget: FC<ChatWidgetProps> = ({ 
  initialOpen = false,
  buttonText = "Chat with us",
  headerTitle = "Chat",
  emptyStateText = "What would you like to know?",
  initialSuggestions = [
    "Is it easy to integrate?", 
    "What if AI doesnt know the answer?",
    "What data do we get?"
  ],
  customHeader,
  customFooter,
  customEmptyState,
  buttonClassName,
  headerClassName,
  bodyClassName,
  footerClassName,
  headerColor = "#4a4a4a",
  sendButtonColor = "#3C3C3C",
  userMessageColor = "#0078d7",
  userMessageTextColor = "#ffffff",
  onOpen,
  onClose,
  onReset
}) => {
  const { sendMessage } = useGlobalChat();
  const [isOpen, setIsOpen] = useState(initialOpen);
  
  // Get chat state from context
  const { resetChat } = useGlobalChat();
  
  const toggleWidget = () => {
    if (!isOpen && onOpen) {
      onOpen();
    } else if (isOpen && onClose) {
      onClose();
    }
    
    setIsOpen(!isOpen);
  };
  
  const handleReset = () => {
    resetChat();
    if (onReset) {
      onReset();
    }
  };
  
  const handleSuggestionClick = useCallback((suggestion: string) => {
    sendMessage(suggestion);
  }, [sendMessage]);

  return (
    <div className={styles.widgetContainer}>
      <ChatWidgetButton
        isOpen={isOpen}
        toggleWidget={toggleWidget}
        buttonText={buttonText}
        buttonClassName={buttonClassName}
      />
      
      {isOpen && (
        <div className={styles.widgetPanel}>
          <ChatWidgetContent
            emptyStateText={emptyStateText}
            initialSuggestions={initialSuggestions}
            customEmptyState={customEmptyState}
            customHeader={customHeader}
            customFooter={customFooter}
            headerTitle={headerTitle}
            headerColor={headerColor}
            bodyClassName={bodyClassName}
            headerClassName={headerClassName}
            footerClassName={footerClassName}
            sendButtonColor={sendButtonColor}
            userMessageColor={userMessageColor}
            userMessageTextColor={userMessageTextColor}
            handleSuggestionClick={handleSuggestionClick}
            handleReset={handleReset}
            toggleWidget={toggleWidget}
          />
        </div>
      )}
    </div>
  );
}; 