import { useGetTasksPerMembers } from 'Hooks/useGetTasksPerMembers';
import { useGetMembers } from 'Hooks/useGetMembers';
import { Draggable } from 'Components';
import { CircularProgress, Tooltip } from '@mui/material';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import Avatar from 'react-avatar';
import classes from './Bench.module.scss';

export const Bench = ({ isBenchLoading }: { isBenchLoading: boolean }) => {
  const { members } = useGetMembers();
  const { tasksPerMembers } = useGetTasksPerMembers();

  return (
    <div className={classes.bench}>
      <span className={classes['bench__title']}>BENCH</span>
      <span className={classes['bench__limit']}>
        Tasks limit:{' '}
        {tasksPerMembers === 0 ? (
          <AllInclusiveIcon style={{ marginLeft: '5px' }} fontSize="small" />
        ) : (
          tasksPerMembers
        )}
      </span>
      <div className={classes['bench__members']}>
        {isBenchLoading ? (
          <CircularProgress style={{ margin: '0 auto' }} color="secondary" />
        ) : (
          members
            .sort((memberA, memberB) =>
              memberA.name.localeCompare(memberB.name)
            )
            ?.map(
              ({ avatarSrc, name, id, taskCount }, index) =>
                tasksPerMembers !== null &&
                (taskCount < tasksPerMembers || tasksPerMembers === 0) && (
                  <Draggable key={id} id={id} index={index}>
                    <div className={classes['bench__member-container']}>
                      <Tooltip
                        arrow
                        key={id}
                        placement="bottom"
                        title={
                          tasksPerMembers === 0
                            ? `${name} (${taskCount} tasks)`
                            : `${name} (${taskCount}/${tasksPerMembers} tasks)`
                        }
                      >
                        <div>
                          <Avatar
                            title={name}
                            src={avatarSrc}
                            name={name}
                            round="50%"
                            size="40px"
                            className={classes['bench__member']}
                          />
                        </div>
                      </Tooltip>
                    </div>
                  </Draggable>
                )
            )
        )}
      </div>
    </div>
  );
};
