import { useState, useEffect, useRef } from "react";
import { ProductDetails } from "../product/ProductDetails";
import { ChatMessage } from "./ChatMessage";
import { SuggestionBubbles } from "./SuggestionBubbles";
import styles from "./ChatContainer.module.scss";

interface ChatContainerProps {
  messages: Array<{text: string, sender: 'user' | 'assistant'}>;
  initialSuggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
  product: {
    name: string;
    image: string;
    reviews: string;
  };
  className?: string;
}

export const ChatContainer = ({ 
  messages, 
  initialSuggestions,
  onSuggestionClick,
  product,
  className 
}: ChatContainerProps) => {
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Hide initial suggestions after first message
  useEffect(() => {
    if (messages.length > 0) {
      setShowSuggestions(false);
    }
  }, [messages]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={`${styles.chatContainer} ${className || ''}`}>
      <ProductDetails product={product} hasMessages={messages.length > 0} />
      
      <div className={styles.messagesContainer}>
        {messages.length === 0 ? (
          showSuggestions && (
            <div className={styles.initialSuggestions}>
              <p className={styles.emptyStateText}>
                Get started by asking a question about this product
              </p>
              <SuggestionBubbles 
                suggestions={initialSuggestions} 
                onSuggestionClick={onSuggestionClick} 
              />
            </div>
          )
        ) : (
          <div className={styles.messages}>
            {messages.map((message, index) => (
              <ChatMessage 
                key={index} 
                text={message.text} 
                sender={message.sender} 
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </div>
  );
}; 