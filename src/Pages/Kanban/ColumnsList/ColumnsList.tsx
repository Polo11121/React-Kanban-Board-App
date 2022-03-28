import { Column } from 'Components';
import { ColumnType, TaskType } from 'shared/types/Kanban';
import { TasksList } from 'Pages/Kanban/TasksList/TasksList';
import { ManageTaskModal } from 'Pages/Kanban/ManageTaskModal/ManageTaskModal';
import { useColumnList } from 'Pages/Kanban/helpers/useColumnList';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { CircularProgress, Backdrop } from '@mui/material';
import { useMoveTask } from 'Pages/Kanban/helpers/useMoveTask';
import AddIcon from '@mui/icons-material/Add';
import classes from './ColumnList.module.scss';

type ColumnsListType = {
  onDelete: (id: string) => void;
  onEdit: ({
    id,
    name,
    numberOfTasks,
    color,
    tasks,
  }: {
    id: string;
    name: string;
    numberOfTasks: number;
    color: string;
    tasks: TaskType[];
  }) => void;
  columns: ColumnType[];
};

export const ColumnsList = ({ columns, onDelete, onEdit }: ColumnsListType) => {
  const {
    showModalHandler,
    deleteTaskHandler,
    editTaskHandler,
    manageTaskModalInfo,
    hideModalHandler,
  } = useColumnList();

  const {
    moveTask,
    sourceColumnId,
    destinationColumnId,
    setMovedTaskIndex,
    movedTaskIndex,
  } = useMoveTask();

  const handleMoveTask = (result: DropResult) => {
    const { source, destination } = result;
    setMovedTaskIndex(source.index);
    if (source.droppableId === destination?.droppableId || !destination) {
      return;
    }

    const task = columns.find(({ id }) => id === source.droppableId)?.tasks[
      source.index
    ];
    if (task && destination) {
      moveTask({
        task,
        sourceColumnId: source.droppableId,
        destinationColumnId: destination.droppableId,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={handleMoveTask}>
      {columns.map(({ name, color, id, numberOfTasks, tasks }) => (
        <Droppable key={id} droppableId={id}>
          {(droppableProvided) => (
            <div
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
            >
              <Column
                tasks={tasks}
                title={name}
                color={
                  tasks.length > numberOfTasks && numberOfTasks ? 'red' : color
                }
                numberOfTasks={numberOfTasks}
                id={id}
                onDelete={onDelete}
                onEdit={onEdit}
              >
                <>
                  {destinationColumnId && sourceColumnId && (
                    <Backdrop
                      open
                      sx={{
                        color: '#fff',
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                      }}
                    >
                      <CircularProgress color="success" />
                    </Backdrop>
                  )}
                  <div className={classes['column-list__task-list']}>
                    <TasksList
                      columnId={id}
                      onDelete={deleteTaskHandler}
                      onEdit={editTaskHandler}
                      color={
                        tasks.length > numberOfTasks && numberOfTasks
                          ? 'red'
                          : color
                      }
                      tasks={
                        id === sourceColumnId
                          ? tasks.filter(
                              (task, index) => index !== movedTaskIndex
                            )
                          : tasks
                      }
                    />
                    {droppableProvided.placeholder}
                  </div>
                  <button
                    className={classes['column-list__add-task-button']}
                    type="button"
                    onClick={() => showModalHandler(id)}
                    data-testid={`${name}-column-add-task`}
                  >
                    <AddIcon />
                    Add Task
                  </button>
                </>
              </Column>
            </div>
          )}
        </Droppable>
      ))}
      {manageTaskModalInfo.isOpen && (
        <ManageTaskModal
          modalInfo={manageTaskModalInfo}
          onClose={hideModalHandler}
        />
      )}
    </DragDropContext>
  );
};
