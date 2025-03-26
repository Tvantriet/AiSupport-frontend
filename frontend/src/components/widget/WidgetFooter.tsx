import { FC, ReactNode } from 'react';
import { Button } from '../common/Button';
import { WidgetChatInput } from './WidgetChatInput';
import { SuggestionBubbles } from '../chat/SuggestionBubbles';
import styles from './Widget.module.scss';

interface ChatWidgetFooterProps {
  customFooter?: ReactNode;
  handleSendMessage: (text: string) => void;
  followUpSuggestions: string[];
  handleSuggestionClick: (suggestion: string) => void;
  sendButtonColor?: string;
  footerClassName?: string;
  messagesExist: boolean;
  isLoading: boolean;
  resetChat: () => void;
}

export const ChatWidgetFooter: FC<ChatWidgetFooterProps> = ({
  customFooter,
  handleSendMessage,
  followUpSuggestions,
  handleSuggestionClick,
  sendButtonColor,
  footerClassName,
  messagesExist,
  isLoading,
  resetChat
}) => {
  if (customFooter) {
    return <>{customFooter}</>;
  }
  
  return (
    <div className={`${styles.widgetFooter} ${footerClassName || ''}`}>
      <WidgetChatInput 
        onSendMessage={handleSendMessage}
        sendButtonColor={sendButtonColor}
        disabled={isLoading}
      />
      
      {followUpSuggestions.length > 0 && (
        <div className={styles.suggestionsWrapper}>
          <SuggestionBubbles
            suggestions={followUpSuggestions}
            onSuggestionClick={handleSuggestionClick}
          />
        </div>
      )}
      
      {messagesExist && (
        <div className={styles.resetButtonWrapper}>
          <Button 
            className={styles.resetButton}
            onClick={resetChat}
            variant="text"
          >
            Reset conversation
          </Button>
        </div>
      )}
    </div>
  );
}; 