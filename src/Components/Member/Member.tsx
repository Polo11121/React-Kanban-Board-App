import Avatar from 'react-avatar';
import classes from './Member.module.scss';

export const Member = ({
  name,
  src,
  size,
  fontSize,
  style,
}: {
  name: string;
  src: string;
  size?: string;
  fontSize?: string;
  style?: any;
}) => (
  <div style={style} className={classes.member}>
    <Avatar name={name} src={src} size={size || '50'} round="50px" />
    <h2 style={{ fontSize }} className={classes['member__name']}>
      {name}
    </h2>
  </div>
);
