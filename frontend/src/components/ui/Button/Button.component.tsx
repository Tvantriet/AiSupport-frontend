import React from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  type = 'button',
  ...rest
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
