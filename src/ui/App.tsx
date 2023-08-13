import { useForm } from 'react-hook-form';
import { InputHookForm as Input } from './components/Input';
import { CheckboxHookForm as Checkbox } from './components/Checkbox';
import { Button } from './components/Button';
import css from './App.style.module.scss';

const App = () => {
  const { control, handleSubmit } = useForm();
  const options = [
    { name: 'sass', label: 'Sass (.sass)' },
    { name: 'react', label: 'React (.tsx)' }
  ];

  const onSubmit = (data: any) => {
    console.log('>>', data);
  };

  return (
    <form className={css.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.wrapper}>
        <Input
          name='fontname'
          control={control}
          label='Font name:'
          placeholder='Font name'
        />
        <Input
          name='prefix'
          control={control}
          label='Prefix:'
          placeholder='Prefix for SVGs and classes...'
        />
        <Input
          name='suffix'
          control={control}
          label='Suffix:'
          placeholder='Suffix for SVGs and classes...'
        />
        <Input
          name='delimiter'
          control={control}
          label='Delimiter:'
          placeholder='Delimiter used for names'
        />
        <div className={css.options}>
          {options.map((opt, index) => (
            <Checkbox
              key={`opt-${index}`}
              name={opt.name}
              control={control}
              label={opt.label}
            />
          ))}
        </div>
      </div>

      <Button>
        Generate <i className={css.counter}>0</i>
      </Button>
    </form>
  );
};

export default App;
