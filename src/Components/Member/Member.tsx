import Avatar from 'react-avatar';
import classes from './Member.module.scss';

export const Member = ({
  name,
  src,
  size = '50',
  fontSize,
  style,
  numberOfTasks,
}: {
  name: string;
  src: string;
  size?: string;
  fontSize?: string;
  style?: any;
  numberOfTasks?: number;
}) => (
  <div style={style} className={classes.member}>
    <Avatar name={name} src={src} size={size} round="50px" />
    <div className={classes['member__info']}>
      <h2 style={{ fontSize }} className={classes['member__name']}>
        {name}
      </h2>
      {numberOfTasks !== undefined && <h3>{numberOfTasks} tasks</h3>}
    </div>
  </div>
);
