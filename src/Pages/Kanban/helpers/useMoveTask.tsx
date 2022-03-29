import { useGetColumns } from 'Hooks/useGetColumns';
import { useGetSections } from 'Hooks/useGetSections';
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
  const { sections } = useGetSections();

  const moveTask = ({
    task,
    sourceColumnId,
    destinationColumnId,
  }: UseMoveTaskType) => {
    const columnId = destinationColumnId.split(':')[0];
    const sectionID = destinationColumnId.split(':')[1];

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
          idSection: sectionID,
          idMember: [],
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
          }
          const sectionTaskLimit = sections.find(
            ({ id }) => id === sectionID
          )?.taskLimit;

          const sectionName = sections.find(({ id }) => id === sectionID)?.name;

          const sectionTasks = columns.reduce(
            (sum, columnn) =>
              sum +
              columnn.tasks.filter(({ idSection }) => idSection === sectionID)
                .length,
            0
          );

          if (column && sectionTaskLimit && sectionTasks >= sectionTaskLimit) {
            useCustomToast({
              text: `Maximum number of tasks allowed in ${sectionName} section has been reached`,
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
