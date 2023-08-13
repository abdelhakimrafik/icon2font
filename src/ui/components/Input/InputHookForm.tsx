import { Control, Controller, FieldValues } from 'react-hook-form';
import Input, { InputProps } from './Input';

interface InputHookFormProps extends InputProps {
  control: Control<FieldValues>;
  name: string;
}

const InputHookForm = ({ control, name, ...rest }: InputHookFormProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Input
          value={value}
          onChange={onChange}
          error={error?.message}
          {...rest}
        />
      )}
    />
  );
};

export default InputHookForm;
