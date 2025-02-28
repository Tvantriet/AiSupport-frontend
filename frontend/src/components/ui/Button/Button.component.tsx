import styles from "./Button.module.scss";

type Props = {
  theme: 'primary' | 'link';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const Button = ({ theme, children, className, onClick }: Props) => {
  return (
    <button type="button" className={`${styles.button} ${styles[theme]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
