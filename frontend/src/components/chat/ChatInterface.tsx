import { useRef, useEffect } from "react";
import { ChatContainer } from "./ChatContainer";
import styles from "./ChatInterface.module.scss";

// Update type to match our ChatMessage from context
interface ChatMessage {
  text: string;
  sender: 'user' | 'assistant';
}

interface ChatInterfaceProps {
  product: {
    name: string;
    image: string;
    reviews: string;
  };
  messages: ChatMessage[];
  followUpSuggestions: string[];
  initialSuggestions?: string[];
  isLoading?: boolean;
  onSuggestionClick: (suggestion: string) => void;
  onReset: () => void;
}

export const ChatInterface = ({ 
  product, 
  messages, 
  followUpSuggestions,
  isLoading = false,
  initialSuggestions = [
    "What are the key features?",
    "Does it support MIDI?",
    "How does it compare to other models?"
  ],
  onSuggestionClick,
  onReset
}: ChatInterfaceProps) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Scroll to top whenever chat is reset
  useEffect(() => {
    if (messages.length === 0 && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  }, [messages]);

  return (
    <div className={styles.chatInterface} ref={chatContainerRef}>
      <ChatContainer 
        messages={messages} 
        onSuggestionClick={onSuggestionClick}
        initialSuggestions={initialSuggestions}
        followUpSuggestions={followUpSuggestions}
        isLoading={isLoading}
        product={product}
      />
      
      {/* Uncomment to add a reset button directly in the interface
      {messages.length > 0 && (
        <div className={styles.resetButtonContainer}>
          <button className={styles.resetButton} onClick={onReset}>
            Reset conversation
          </button>
        </div>
      )}
      */}
    </div>
  );
}; 