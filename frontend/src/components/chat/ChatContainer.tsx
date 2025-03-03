import { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { SuggestionBubbles } from "./SuggestionBubbles";
import styles from "./ChatContainer.module.scss";

interface ChatContainerProps {
  messages: Array<{text: string, sender: 'user' | 'bot'}>;
  onSuggestionClick: (suggestion: string) => void;
  initialSuggestions: string[];
}

export const ChatContainer = ({ messages, onSuggestionClick, initialSuggestions }: ChatContainerProps) => {
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div 
      className={styles.chatContainer}
      ref={chatHistoryRef}
    >
      {messages.length === 0 ? (
        <div className={styles.emptyStateContainer}>
          <div className={styles.emptyState}>
            Here to help with troubleshooting, configuration, or general questions
          </div>
          <SuggestionBubbles 
            suggestions={initialSuggestions} 
            onSuggestionClick={onSuggestionClick} 
          />
        </div>
      ) : (
        messages.map((message, index) => (
          <ChatMessage 
            key={index} 
            text={message.text} 
            sender={message.sender} 
          />
        ))
      )}
    </div>
  );
}; 