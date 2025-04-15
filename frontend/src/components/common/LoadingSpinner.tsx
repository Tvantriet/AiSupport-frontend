import React from 'react';
import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color,
  className = '',
}) => {
  const spinnerStyle = color ? { borderTopColor: color } : undefined;
  
  return (
    <div 
      className={`${styles.spinner} ${styles[size]} ${className}`}
      style={spinnerStyle}
      role="status"
      aria-label="Loading"
    />
  );
}; 