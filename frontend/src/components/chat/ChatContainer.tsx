import React, { useRef, useEffect } from 'react';
import { ChatMessage as ChatMessageType } from '../../types/chat';
import { ChatMessage } from './ChatMessage';
import { SuggestionBubbles } from './SuggestionBubbles';
import { Product } from '../../types/product';
import styles from './ChatContainer.module.scss';

interface ChatContainerProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  initialSuggestions?: string[];
  onSuggestionClick: (suggestion: string) => void;
  product?: Product | null; // Make this optional and only for context, don't display it
  followUpSuggestions?: string[];
  isLoadingFollowUps?: boolean;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  isLoading,
  initialSuggestions = [],
  onSuggestionClick,
  product, // We'll only use this for context, not display
  followUpSuggestions,
  isLoadingFollowUps
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change or loading state changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesContainer}>
        {messages.length === 0 ? (
          // Show empty state with suggestions
          <div className={styles.emptyState}>
            <p className={styles.emptyStateText}>
              {product 
                ? `Ask me anything about the ${product.name}!` 
                : "Select a product to get started"}
            </p>
            
            {initialSuggestions && initialSuggestions.length > 0 && (
              <div className={styles.initialSuggestions}>
                <SuggestionBubbles 
                  suggestions={initialSuggestions}
                  onSuggestionClick={onSuggestionClick}
                />
              </div>
            )}
          </div>
        ) : (
          // Show messages
          <>
            {messages.map((message, index) => (
              <ChatMessage 
                key={index}
                text={message.text}
                sender={message.sender}
              />
            ))}
            
            {/* Enhanced typing indicator with three animated dots */}
            {isLoading && (
              <div className={styles.typingIndicator}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            
            {/* Invisible div for scrolling to the bottom */}
            <div ref={messagesEndRef} />
            
            {messages.length > 0 && (followUpSuggestions?.length || isLoadingFollowUps) && (
              <div className={styles.followUpSuggestions}>
                {isLoadingFollowUps ? (
                  <div className={styles.loadingFollowUps}>
                    Thinking of follow-up questions...
                  </div>
                ) : (
                  <>
                    <p className={styles.followUpHeading}>You might want to ask:</p>
                    <SuggestionBubbles
                      suggestions={followUpSuggestions || []}
                      onSuggestionClick={onSuggestionClick}
                    />
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}; 