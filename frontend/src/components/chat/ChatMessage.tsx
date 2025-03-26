import styles from './ChatMessage.module.scss';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  text: string;
  sender: 'user' | 'assistant';
  userMessageColor?: string;
  userMessageTextColor?: string;
}

export const ChatMessage = ({ 
  text, 
  sender,
  userMessageColor,
  userMessageTextColor
}: ChatMessageProps) => {
  const isUser = sender === 'user';
  
  // Custom styles for user messages
  const userMessageStyle = isUser ? {
    backgroundColor: userMessageColor,
    color: userMessageTextColor
  } : undefined;
  
  return (
    <div className={isUser ? styles.userMessageContainer : styles.assistantMessageContainer}>
      <div className={isUser ? styles.userBubble : styles.assistantText}>
        {isUser ? (
          text
        ) : (
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({children}) => <div className={styles.markdown}>{children}</div>
            }}
          >
            {text}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}; 