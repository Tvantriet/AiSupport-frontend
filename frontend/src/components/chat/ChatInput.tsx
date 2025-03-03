import { useState, useRef, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";
import styles from "./ChatInput.module.scss";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize the textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = 'auto';
      
      // Set the height to scrollHeight to expand the textarea
      const scrollHeight = textareaRef.current.scrollHeight;
      
      // Set a maximum height (e.g., 100px) before adding scrollbar
      const maxHeight = 100;
      
      textareaRef.current.style.height = 
        scrollHeight > maxHeight 
          ? `${maxHeight}px` 
          : `${scrollHeight}px`;
    }
  }, [inputValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
      
      // Reset height after sending
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  // Handle Enter key to submit, but allow Shift+Enter for new lines
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.chatInputForm}>
      <div className={styles.inputContainer}>
        <textarea 
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What do you need help with?" 
          rows={1}
          className={styles.inputTextarea}
        />
        <button type="submit" className={styles.sendButton}>
          <FaArrowUp size={16} />
        </button>
      </div>
    </form>
  );
}; 