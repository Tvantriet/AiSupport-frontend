import { FC, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

// Define button variants
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'danger' | 'success';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  className?: string;
  children?: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  children,
  disabled,
  type = 'button',
  ...rest
}) => {
  // Combine class names based on props
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    isLoading ? styles.loading : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      type={type}
      {...rest}
    >
      {isLoading && <span className={styles.spinner} />}
      
      {!isLoading && icon && iconPosition === 'left' && (
        <span className={styles.iconLeft}>{icon}</span>
      )}
      
      {children && <span className={styles.label}>{children}</span>}
      
      {!isLoading && icon && iconPosition === 'right' && (
        <span className={styles.iconRight}>{icon}</span>
      )}
    </button>
  );
}; 