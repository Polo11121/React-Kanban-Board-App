/* eslint-disable security/detect-object-injection */
import { Dispatch, SetStateAction, useState } from 'react';
import { useMoveTask } from 'Pages/Kanban/helpers/useMoveTask';
import { useAddMemberToTask } from 'Hooks/useAddMemberToTask';
import { useChangeColumnsOrder } from 'Hooks/useChangeColumnsOrder';
import { ColumnType } from 'shared/types/Kanban.type';
import { useCustomToast } from 'shared/helpers/useCustomToast';
import { useQueryClient } from 'react-query';
import { DropResult } from 'react-beautiful-dnd';
import { insert } from 'shared/helpers/functions';

export const useMove = ({
  columnsOrder,
  columns,
  setColumns,
}: {
  columnsOrder: string[];
  columns: ColumnType[] | null;
  setColumns: Dispatch<SetStateAction<ColumnType[] | null>>;
}) => {
  const queryClient = useQueryClient();
  const [isUserMoved, setIsUserMoved] = useState(false);
  const [isTaskMoved, setIsTaskMoved] = useState(false);

  const onSuccess = () => {
    useCustomToast({ text: 'Column successfully moved', type: 'success' });
    queryClient.invalidateQueries('columns');
    queryClient.invalidateQueries('columnsOrder');
  };

  const onSuccessAddedUserToTask = () => {
    useCustomToast({
      text: 'User successfully assigned to task',
      type: 'success',
    });
    queryClient.invalidateQueries('members');
    queryClient.invalidateQueries('columns');
    queryClient.invalidateQueries('columnsOrder');
  };

  const onErrorAddedUserToTask = (error: any) =>
    useCustomToast({ text: error.response.data.message, type: 'error' });

  const { moveTask, isLoading } = useMoveTask();
  const { mutate: addMemberToTask, isLoading: isBenchLoading } =
    useAddMemberToTask(onSuccessAddedUserToTask, onErrorAddedUserToTask);
  const { mutate: changeColumnsOrder } = useChangeColumnsOrder(onSuccess);

  const onDragStart = (result: DropResult) =>
    result.source.droppableId === 'bench'
      ? setIsUserMoved(true)
      : setIsTaskMoved(true);

  const handleMoveTask = (result: DropResult) => {
    setIsUserMoved(false);
    setIsTaskMoved(false);

    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === 'bench') {
      addMemberToTask({ id: destination.droppableId, userId: draggableId });
    } else {
      const task = columns
        ?.find(({ id }) => id === source.droppableId.split(':')[0])
        ?.tasks.filter(
          ({ idSection }) => idSection === source.droppableId.split(':')[1]
        )[source.index];

      if (task) {
        const columnsWithoutMovedTask = columns.map(({ id, tasks }, index) => {
          if (id === source.droppableId.split(':')[0]) {
            return {
              ...columns[index],
              arrayOfTasks: columns[index].arrayOfTasks.filter(
                (order) => order !== task.id
              ),
              tasks: tasks.filter(({ id: taskId }) => taskId !== task.id),
            };
          }

          return { ...columns[index], tasks };
        });
        const columnsWithMovedTask = columnsWithoutMovedTask.map((column) =>
          column.id === destination.droppableId.split(':')[0]
            ? {
                ...column,
                arrayOfTasks: insert(
                  column.arrayOfTasks,
                  destination.index,
                  task.id
                ),
                tasks: [
                  ...column.tasks,
                  {
                    ...task,
                    column: destination.droppableId.split(':')[0],
                    idSection: destination.droppableId.split(':')[1],
                    idTask: draggableId.split('-')[2],
                  },
                ],
              }
            : column
        );
        setColumns(columnsWithMovedTask);
      }

      if (task && destination) {
        moveTask({
          task: { ...task, id: draggableId.split('-')[2] },
          index: destination.index,
          sourceColumnId: source.droppableId,
          destinationColumnId: destination.droppableId,
        });
      }
    }
  };

  const handleMoveColumn = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (destination?.index === source.index || !destination) {
      return;
    }

    const columnsOrderWithoutMoved = columnsOrder.filter(
      (columnId) => columnId !== draggableId
    );

    const newColumnsOrder = [
      ...columnsOrderWithoutMoved.slice(0, destination?.index),
      draggableId,
      ...columnsOrderWithoutMoved.slice(destination?.index),
    ];

    if (columns) {
      setColumns(
        newColumnsOrder.map((columnId) =>
          columns.find(({ id }) => columnId === id)
        ) as ColumnType[]
      );
    }

    changeColumnsOrder({
      columnsOrder: newColumnsOrder,
    });
  };

  return {
    handleMoveTask,
    handleMoveColumn,
    isUserMoved,
    onDragStart,
    isTaskMoved,
    isLoading,
    isBenchLoading,
  };
};
