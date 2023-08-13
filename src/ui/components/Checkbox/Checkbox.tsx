import clsx from 'clsx';
import css from './style.module.scss';
import { useId } from 'react';

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  className?: string;
  error?: string;
  onChange?: (checked: boolean) => void;
}

const Checkbox = ({ label, checked, className, onChange }: CheckboxProps) => {
  const id = useId();

  return (
    <div className={clsx(className, css.container)}>
      <input
        id={id}
        className={css.input}
        type='checkbox'
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      {label ? (
        <label htmlFor={id} className={css.label}>
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default Checkbox;
