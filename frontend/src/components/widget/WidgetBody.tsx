import { FC, ReactNode, useRef, useEffect } from 'react';
import { ChatMessage } from '../chat/ChatMessage';
import { SuggestionBubbles } from '../chat/SuggestionBubbles';
import styles from './Widget.module.scss';
import { ChatMessage as ChatMessageType } from '../../types/chat';

interface ChatWidgetBodyProps {
  messages: ChatMessageType[];
  product?: {
    name: string;
    image: string;
  };
  emptyStateText: string;
  initialSuggestions: string[];
  customEmptyState?: ReactNode;
  bodyClassName?: string;
  userMessageColor?: string;
  userMessageTextColor?: string;
  handleSuggestionClick: (suggestion: string) => void;
}

export const ChatWidgetBody: FC<ChatWidgetBodyProps> = ({
  messages,
  product,
  emptyStateText,
  initialSuggestions,
  customEmptyState,
  bodyClassName,
  userMessageColor,
  userMessageTextColor,
  handleSuggestionClick
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  return (
    <div className={`${styles.widgetBody} ${bodyClassName || ''}`}>
      {product && (
        <div className={styles.productDetailsWrapper}>
          <div className={styles.productImage}>
            <img src={product.image} alt={product.name} />
          </div>
          <h2 className={styles.productTitle}>{product.name}</h2>
        </div>
      )}
      
      <div className={styles.messagesContainer}>
        {messages.length === 0 ? (
          customEmptyState ? (
            customEmptyState
          ) : (
            <div className={styles.emptyState}>
              <p>{emptyStateText}</p>
              <div className={styles.initialSuggestions}>
                <SuggestionBubbles 
                  suggestions={initialSuggestions} 
                  onSuggestionClick={handleSuggestionClick} 
                />
              </div>
            </div>
          )
        ) : (
          <>
            {messages.map((message, index) => (
              <ChatMessage 
                key={index} 
                text={message.text} 
                sender={message.sender}
                userMessageColor={userMessageColor}
                userMessageTextColor={userMessageTextColor}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
    </div>
  );
}; 