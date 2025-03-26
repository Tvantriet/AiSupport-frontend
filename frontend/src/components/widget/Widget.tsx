import { FC, ReactNode, useState } from 'react';
import { useGlobalChat } from '../../context/ChatContext';
import { ChatWidgetButton } from './WidgetButton';
import { ChatWidgetHeader } from './WidgetHeader';
import { ChatWidgetBody } from './WidgetBody';
import { ChatWidgetFooter } from './WidgetFooter';
import styles from './Widget.module.scss';

interface ChatWidgetProps {
  // Product data
  product?: {
    name: string;
    image: string;
    reviews?: string;
  };
  
  // Widget customization
  initialOpen?: boolean;
  buttonText?: string;
  headerTitle?: string;
  emptyStateText?: string;
  
  // Initial suggestions
  initialSuggestions?: string[];
  
  // Custom components
  customHeader?: ReactNode;
  customFooter?: ReactNode;
  customEmptyState?: ReactNode;
  
  // Styling
  buttonClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  headerColor?: string;
  sendButtonColor?: string;
  userMessageColor?: string;
  userMessageTextColor?: string;
  
  // Callbacks
  onOpen?: () => void;
  onClose?: () => void;
  onReset?: () => void;
}

export const ChatWidget: FC<ChatWidgetProps> = ({ 
  product,
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
  const [isOpen, setIsOpen] = useState(initialOpen);
  
  // Get chat state from context
  const {
    messages,
    followUpSuggestions,
    isLoading,
    sendMessage,
    resetChat
  } = useGlobalChat();
  
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
  
  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

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
          <ChatWidgetHeader
            customHeader={customHeader}
            headerTitle={headerTitle}
            headerColor={headerColor}
            toggleWidget={toggleWidget}
            headerClassName={headerClassName}
          />
          
          <ChatWidgetBody
            messages={messages}
            product={product}
            emptyStateText={emptyStateText}
            initialSuggestions={initialSuggestions}
            customEmptyState={customEmptyState}
            bodyClassName={bodyClassName}
            userMessageColor={userMessageColor}
            userMessageTextColor={userMessageTextColor}
            handleSuggestionClick={handleSuggestionClick}
          />
          
          <ChatWidgetFooter
            customFooter={customFooter}
            handleSendMessage={sendMessage}
            followUpSuggestions={followUpSuggestions}
            handleSuggestionClick={handleSuggestionClick}
            sendButtonColor={sendButtonColor}
            footerClassName={footerClassName}
            messagesExist={messages.length > 0}
            isLoading={isLoading}
            resetChat={handleReset}
          />
        </div>
      )}
    </div>
  );
}; 