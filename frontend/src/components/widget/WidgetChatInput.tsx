import { FC, useState, KeyboardEvent, ChangeEvent, useRef, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import styles from './WidgetInput.module.scss';

interface WidgetChatInputProps {
  onSendMessage: (text: string) => void;
  sendButtonColor?: string;
  disabled?: boolean;
}

export const WidgetChatInput: FC<WidgetChatInputProps> = ({
  onSendMessage,
  sendButtonColor,
  disabled = false
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-resize textarea as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);
  
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  
  // Custom button style based on prop
  const buttonStyle = sendButtonColor ? { backgroundColor: sendButtonColor } : undefined;
  
  return (
    <form className={styles.chatInputForm} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <textarea
          ref={textareaRef}
          className={styles.inputTextarea}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={disabled}
          rows={1}
        />
        <button 
          type="submit" 
          disabled={!message.trim() || disabled}
          style={buttonStyle}
          aria-label="Send message"
        >
          <FaPaperPlane />
        </button>
      </div>
    </form>
  );
}; 