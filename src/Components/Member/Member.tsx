import Avatar from 'react-avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import classes from './Member.module.scss';

type MemberType = {
  memberName: string;
  src: string;
  size?: string;
  fontSize?: string;
  style?: any;
  numberOfTasks?: number;
  onDelete?: ({ id, name }: { id: string; name: string }) => void;
  memberId?: string;
  isAdmin?: boolean;
};

export const Member = ({
  memberName,
  src,
  size = '50',
  fontSize,
  style,
  numberOfTasks,
  memberId,
  onDelete,
  isAdmin = false,
}: MemberType) => (
  <div style={style} className={classes.member}>
    <Avatar name={memberName} src={src} size={size} round="50px" />
    <div className={classes['member__info']}>
      <h2 style={{ fontSize }} className={classes['member__name']}>
        {memberName}
      </h2>
      <div className={classes['member__right-content']}>
        {numberOfTasks !== undefined && <h3>{numberOfTasks} tasks</h3>}
        {onDelete && memberId && isAdmin && (
          <DeleteIcon
            data-testid={`${memberName}-delete-icon`}
            onClick={() => onDelete({ id: memberId, name: memberName })}
            style={{ cursor: 'pointer' }}
            fontSize="small"
          />
        )}
      </div>
    </div>
  </div>
);
