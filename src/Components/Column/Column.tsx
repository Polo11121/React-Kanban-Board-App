import { ReactNode } from 'react';
import classes from './Column.module.scss';

type ColumnProps = {
  title: string;
  children: ReactNode;
};

export const Column = ({ title, children }: ColumnProps) => (
  <section className={classes.column} data-testid={`${title}-column`}>
    <div className={classes['column__content']}>{children}</div>
  </section>
);
