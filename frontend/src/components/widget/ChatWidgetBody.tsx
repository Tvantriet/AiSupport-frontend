import { FC, ReactNode, useRef, useEffect } from 'react';
import { ChatMessage as ChatMessageComponent } from '../chat/ChatMessage';
import { SuggestionBubbles } from '../chat/SuggestionBubbles';
import { Product } from '../../types/product';
import { ChatMessage as ChatMessageType } from '../../types/chat';
import { Button } from '../ui/Button/Button.component';
import styles from './ChatWidget.module.scss';

interface ChatWidgetBodyProps {
  messages: ChatMessageType[];
  product?: Product; // Make product optional to support both use cases
  emptyStateText: string;
  initialSuggestions: string[];
  customEmptyState?: ReactNode;
  bodyClassName?: string;
  userMessageColor?: string;
  userMessageTextColor?: string;
  handleSuggestionClick: (suggestion: string) => void;
  isLoading?: boolean; // Make loading optional
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
  handleSuggestionClick,
  isLoading = false // Default to false if not provided
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]); // Also scroll when loading state changes
  
  // Render empty state if no messages
  if (messages.length === 0) {
    if (customEmptyState) {
      return (
        <div className={`${styles.widgetBody} ${bodyClassName || ''}`}>
          {customEmptyState}
        </div>
      );
    }
    
    return (
      <div className={`${styles.widgetBody} ${bodyClassName || ''}`}>
        {product && (
          <div className={styles.productInfo}>
            {product.image && (
              <img 
                src={product.image} 
                alt={product.name} 
                className={styles.productImage}
              />
            )}
            <h3 className={styles.productName}>{product.name}</h3>
            {product.reviews && (
              <div className={styles.productReviews}>{product.reviews}</div>
            )}
          </div>
        )}
        
        <div className={styles.emptyState}>
          <p>{emptyStateText}</p>
          <div className={styles.initialSuggestions}>
            {/* Support both rendering approaches */}
            {Array.isArray(initialSuggestions) && initialSuggestions.length > 0 && (
              typeof SuggestionBubbles !== 'undefined' ? (
                <SuggestionBubbles 
                  suggestions={initialSuggestions} 
                  onSuggestionClick={handleSuggestionClick} 
                />
              ) : (
                // Fallback to direct rendering if SuggestionBubbles isn't available
                initialSuggestions.map((suggestion, index) => {
                  console.log('Rendering suggestion with Button component');
                  return (
                    <Button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={styles.suggestionButton}
                      variant="secondary" // Try explicitly setting a variant
                    >
                      {suggestion}
                    </Button>
                  );
                })
              )
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // Render messages
  return (
    <div className={`${styles.widgetBody} ${bodyClassName || ''}`}>
      <div className={styles.messageList || styles.messagesContainer}>
        {messages.map((message, index) => (
          typeof ChatMessageComponent !== 'undefined' ? (
            // Use the ChatMessage component if available
            <ChatMessageComponent 
              key={index} 
              text={message.text} 
              sender={message.sender}
              userMessageColor={userMessageColor}
              userMessageTextColor={userMessageTextColor}
            />
          ) : (
            // Fallback to direct rendering if ChatMessage component isn't available
            <div 
              key={index} 
              className={`${styles.message} ${
                message.sender === 'user' ? styles.userMessage : styles.assistantMessage
              }`}
              style={
                message.sender === 'user' 
                  ? { 
                      backgroundColor: userMessageColor,
                      color: userMessageTextColor
                    } 
                  : undefined
              }
            >
              {message.text}
            </div>
          )
        ))}
        
        {isLoading && (
          <div className={styles.typingIndicator}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        
        {/* Add the scroll reference */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}; 