import { FC, ReactNode } from 'react';
import { Button } from '../ui/Button';
import { WidgetChatInput } from './WidgetChatInput';
import { SuggestionBubbles } from '../chat/SuggestionBubbles';
import styles from './ChatWidget.module.scss';

interface ChatWidgetFooterProps {
  customFooter?: ReactNode;
  handleSendMessage: (text: string) => void;
  followUpSuggestions: string[];
  handleSuggestionClick: (suggestion: string) => void;
  sendButtonColor?: string;
  footerClassName?: string;
  messagesExist: boolean;
  isLoading: boolean;
  isLoadingFollowUps?: boolean;
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
  isLoadingFollowUps = false,
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
      
      {followUpSuggestions.length > 0 && !isLoadingFollowUps && (
        <div className={styles.suggestionsWrapper}>
          {typeof SuggestionBubbles !== 'undefined' ? (
            <SuggestionBubbles
              suggestions={followUpSuggestions}
              onSuggestionClick={handleSuggestionClick}
            />
          ) : (
            followUpSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={styles.suggestionButton}
              >
                {suggestion}
              </button>
            ))
          )}
        </div>
      )}
      
      {isLoadingFollowUps && (
        <div className={styles.suggestionsWrapper}>
          <div className={styles.loadingFollowUps}>
            Thinking of follow-up questions...
          </div>
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