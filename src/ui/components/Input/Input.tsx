import css from './style.module.scss';
import clsx from 'clsx';

export interface InputProps {
  type?: 'text' | 'password' | 'number';
  label?: string;
  placeholder?: string;
  value?: any;
  className?: string;
  error?: string;
  onChange?: (value: any) => void;
}

const Input = ({
  type = 'text',
  label,
  placeholder,
  value,
  className,
  onChange
}: InputProps) => {
  return (
    <div className={clsx(className, css.container)}>
      {label ? <label className={css.label}>{label}</label> : null}
      <input
        type={type}
        className={css.input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
};

export default Input;
