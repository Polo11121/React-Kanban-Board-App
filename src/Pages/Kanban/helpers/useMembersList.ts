import { useChangeTasksPerMembers } from 'Hooks/useChangeTasksPerMembers';
import { useGetMembers } from 'Hooks/useGetMembers';
import { useGetTasksPerMembers } from 'Hooks/useGetTasksPerMembers';
import { ChangeEvent, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useCustomToast } from 'shared/helpers/useCustomToast';

export const useMembersList = () => {
  const queryClient = useQueryClient();
  const { members } = useGetMembers();
  const { tasksPerMembers: actualTasksPerMembers } = useGetTasksPerMembers();
  const [tasksPerMembers, setTasksPerMembers] = useState(actualTasksPerMembers);

  const minNumberOfTasks = Math.max(
    ...members.map(({ taskCount }) => taskCount)
  );

  const changeTaskPerMemberHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setTasksPerMembers(+event.target.value);

  const isTasksPerMembersInvalid = Boolean(
    (tasksPerMembers !== null && tasksPerMembers < 0) ||
      (tasksPerMembers !== null && tasksPerMembers < minNumberOfTasks)
  );

  const onSuccess = () => {
    useCustomToast({
      text: `Number of tasks changed`,
      type: 'success',
    });
    queryClient.invalidateQueries('tasksPerMembers');
  };
  const { mutate: changeTasksPerMembers } = useChangeTasksPerMembers(onSuccess);

  const submitTasksPerMembersHandler = () =>
    tasksPerMembers !== null && changeTasksPerMembers(tasksPerMembers);

  return {
    members,
    isTasksPerMembersInvalid:
      tasksPerMembers === 0 ? false : isTasksPerMembersInvalid,
    tasksPerMembers,
    changeTaskPerMemberHandler,
    submitTasksPerMembersHandler,
    actualTasksPerMembers,
    minNumberOfTasks,
  };
};
