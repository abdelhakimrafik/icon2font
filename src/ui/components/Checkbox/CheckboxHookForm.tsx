import { Control, Controller, FieldValues } from 'react-hook-form';
import Checkbox, { CheckboxProps } from './Checkbox';

interface CheckboxHookFormProps extends CheckboxProps {
  control: Control<FieldValues>;
  name: string;
}

const CheckboxHookForm = ({
  control,
  name,
  ...rest
}: CheckboxHookFormProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Checkbox
          checked={value}
          onChange={onChange}
          error={error?.message}
          {...rest}
        />
      )}
    />
  );
};

export default CheckboxHookForm;
