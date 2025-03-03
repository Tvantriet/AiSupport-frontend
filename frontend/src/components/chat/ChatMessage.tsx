import styles from './ChatMessage.module.scss';

interface ChatMessageProps {
  text: string;
  sender: 'user' | 'bot';
}

export const ChatMessage = ({ text, sender }: ChatMessageProps) => {
  const isUser = sender === 'user';
  
  return (
    <div className={isUser ? styles.userMessageContainer : styles.botMessageContainer}>
      <div className={isUser ? styles.userBubble : styles.botText}>
        {text}
      </div>
    </div>
  );
}; 