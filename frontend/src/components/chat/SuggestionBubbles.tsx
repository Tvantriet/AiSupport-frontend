import styles from './SuggestionBubbles.module.scss';

interface SuggestionBubblesProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

export const SuggestionBubbles = ({ 
  suggestions, 
  onSuggestionClick,
}: SuggestionBubblesProps) => {
  if (suggestions.length === 0) return null;
  
  return (
    <div className={styles.suggestionsContainer}>
      <div className={styles.bubblesWrapper}>
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className={styles.bubble}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}; 