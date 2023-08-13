import clsx from 'clsx';
import css from './style.module.scss';

export interface ButtonProps {
  text?: string;
  role?: 'button' | 'submit';
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ text, role, className, children, onClick }: ButtonProps) => {
  return (
    <button
      className={clsx(className, css.button)}
      role={role}
      onClick={onClick}
    >
      {children ? children : text}
    </button>
  );
};

export default Button;
