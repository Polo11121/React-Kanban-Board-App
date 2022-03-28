import { useGetColumns } from 'Hooks/useGetColumns';
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
  const { data: columns } = useGetColumns();

  const moveTask = ({
    task,
    sourceColumnId,
    destinationColumnId,
  }: UseMoveTaskType) => {
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
          column: destinationColumnId,
        },
        // Ewentualnie /tasks
        endpoint: `tasks`,
      }).then(() => {
        queryClient.invalidateQueries('columns').then(() => {
          useCustomToast({ text: 'Task successfully moved', type: 'success' });
          const column = columns.find(({ id }) => id === destinationColumnId);
          if (
            column &&
            column?.tasks.length >= column?.numberOfTasks &&
            column.numberOfTasks
          ) {
            useCustomToast({
              text: `Maximum number of tasks allowed in ${column.name} column has been reached`,
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
