import { useState } from 'react';
import css from './Tabs.module.scss';
import clsx from 'clsx';

type tab = {
  name: string;
  component: React.ReactElement;
};

export interface TabsProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  tabs: tab[];
}

export default function Tabs({ tabs, className }: TabsProps) {
  const [active, setActive] = useState<number>(0);
  return (
    <div className={clsx(css.container, className)}>
      <nav className={css.navbar}>
        <ul>
          {tabs.map((tab, index) => (
            <li
              key={`nav-item-${index}`}
              className={clsx(active === index && css.active)}
              onClick={() => setActive(index)}
            >
              {tab.name}
            </li>
          ))}
        </ul>
      </nav>
      <div className={css.wrapper}>{tabs[active].component}</div>
    </div>
  );
}
