import React from 'react';
import styles from './SuggestionBubbles.module.scss';
import { Button } from '../ui/Button';

interface SuggestionBubblesProps {
  suggestions?: string[];
  onSuggestionClick: (suggestion: string) => void;
}

export const SuggestionBubbles: React.FC<SuggestionBubblesProps> = ({ 
  suggestions = [], // Provide default empty array
  onSuggestionClick 
}) => {
  // If no suggestions, don't render
  if (!suggestions || suggestions.length === 0) {
    return null;
  }
  
  return (
    <div className={styles.suggestionBubbles}>
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          className={styles.suggestionBubble}
          onClick={() => onSuggestionClick(suggestion)}
          type="button"
          variant="text"
          size="small"
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
}; 