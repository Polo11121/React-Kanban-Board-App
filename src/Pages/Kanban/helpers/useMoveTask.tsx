import { useGetColumns } from 'Hooks/useGetColumns';
import { useGetUsers } from 'Hooks/useGetUsers';
import { useManageColumn } from 'Hooks/useManageColumn';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useCustomToast } from 'shared/helpers/useCustomToast';
import { TaskType } from 'shared/types/Kanban';

type UseMoveTaskType = {
  task: TaskType;
  sourceColumnId: string;
  destinationColumnId: string;
};
export const useMoveTask = () => {
  const [movedTaskIndex, setMovedTaskIndex] = useState<null | number>(null);
  const [moveTaskInfo, setMoveTaskInfo] = useState({
    sourceColumnId: '',
    destinationColumnId: '',
  });
  const queryClient = useQueryClient();
  const { mutateAsync } = useManageColumn(() => null);
  const { columns } = useGetColumns();
  const { users } = useGetUsers();

  const moveTask = ({
    task,
    sourceColumnId,
    destinationColumnId,
  }: UseMoveTaskType) => {
    const columnId = destinationColumnId.split(':')[0];
    const userID = destinationColumnId.split(':')[1];

    setMoveTaskInfo({
      sourceColumnId,
      destinationColumnId,
    });
    mutateAsync({
      method: 'DELETE',
      endpoint: `tasks/${task.id}`,
    }).then(() =>
      mutateAsync({
        method: 'POST',
        payload: {
          name: task.name,
          description: task.description,
          column: columnId,
          idUser: userID,
        },
        endpoint: `tasks`,
      }).then(() => {
        queryClient.invalidateQueries('columns').then(() => {
          useCustomToast({ text: 'Task successfully moved', type: 'success' });
          const column = columns.find(({ id }) => id === columnId);
          if (
            column &&
            column?.tasks.length >= column?.numberOfTasks &&
            column.numberOfTasks
          ) {
            useCustomToast({
              text: `Maximum number of tasks allowed in ${column.name} column has been exceeded`,
              type: 'error',
              autoClose: 2500,
            });
          } else if (
            column &&
            column?.tasks.filter(({ idUser }) => idUser === userID).length >=
              column?.numberOfTasksPerUsers &&
            column?.numberOfTasksPerUsers &&
            users.find(({ id }) => id === userID)?.name !== 'Unassigned'
          ) {
            useCustomToast({
              text: `${
                users.find(({ id }) => id === userID)?.name
              } exceeded maximum  number of tasks allowed in ${
                column.name
              } column`,
              type: 'error',
              autoClose: 2500,
            });
          }
          setMoveTaskInfo({
            sourceColumnId: '',
            destinationColumnId: '',
          });
          setMovedTaskIndex(null);
        });
      })
    );
  };

  return {
    moveTask,
    sourceColumnId: moveTaskInfo.sourceColumnId,
    destinationColumnId: moveTaskInfo.destinationColumnId,
    movedTaskIndex,
    setMovedTaskIndex,
  };
};
