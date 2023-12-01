import { Tabs } from './components/Tabs';
import { Footer } from './components/Footer';
import css from './App.module.scss';

const tabs = [
  {
    name: 'Icons',
    component: <div>tab1</div>
  },
  {
    name: 'Inspect',
    component: <div>tab2</div>
  },
  {
    name: 'Settings',
    component: <div>tab3</div>
  }
];

const App = () => {
  return (
    <>
      <Tabs className={css.tabs} tabs={tabs} />
      <Footer />
    </>
  );
};

export default App;
