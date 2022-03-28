import { useState } from 'react';
import { TasksList } from 'Pages/Kanban/TasksList/TasksList';
import { ManageTaskModal } from 'Pages/Kanban/ManageTaskModal/ManageTaskModal';
import { useColumnList } from 'Pages/Kanban/helpers/useColumnList';
import { Column, MemberName } from 'Components';
import { ColumnType } from 'shared/types/Kanban';
import { useCustomToast } from 'shared/helpers/useCustomToast';
import { Droppable } from 'react-beautiful-dnd';
import AddIcon from '@mui/icons-material/Add';
import classes from './ColumnList.module.scss';

type ColumnsListType = {
  user: { id: string; name: string };
  columns: ColumnType[];
};

export const ColumnsList = ({ columns, user }: ColumnsListType) => {
  const [isOpen, setIsOpen] = useState(
    Boolean(localStorage.getItem(user.name))
  );

  const {
    showModalHandler,
    deleteTaskHandler,
    editTaskHandler,
    manageTaskModalInfo,
    hideModalHandler,
    removeMemberHandler,
  } = useColumnList();

  const memberNumberOfTasks = columns.reduce(
    (sum, column) =>
      sum + column.tasks.filter(({ idUser }) => idUser === user.id).length,
    0
  );

  const hideColumnsHandler = () => {
    setIsOpen((prevState) => !prevState);
    if (isOpen) {
      localStorage.setItem(user.name, '');
    } else {
      localStorage.setItem(user.name, 'open');
    }
  };

  const handleRemoveMember = () => {
    if (memberNumberOfTasks > 0) {
      useCustomToast({
        text: `Remove tasks from ${user.name} first`,
        type: 'error',
      });
    } else {
      removeMemberHandler(user.id);
    }
  };

  return (
    <div className={classes['column-list__content']}>
      <MemberName
        name={user.name}
        isOpen={isOpen}
        handleRemoveMember={handleRemoveMember}
        hideColumnsHandler={hideColumnsHandler}
        memberNumberOfTasks={memberNumberOfTasks}
      />
      <div style={{ display: `${isOpen ? 'flex' : 'none'}` }}>
        {columns.map(
          ({
            name,
            color,
            id,
            numberOfTasks,
            tasks,
            numberOfTasksPerUsers,
          }) => (
            <Droppable key={id} droppableId={`${id}:${user.id}`}>
              {(droppableProvided) => (
                <div
                  {...droppableProvided.droppableProps}
                  ref={droppableProvided.innerRef}
                >
                  <Column title={name}>
                    <>
                      <div
                        style={{
                          minHeight: `${
                            Math.max(
                              1,
                              ...columns.map(
                                ({ tasks: columnTasks }) =>
                                  columnTasks.filter(
                                    ({ idUser }) => idUser === user.id
                                  ).length
                              )
                            ) *
                              220 +
                            18
                          }px`,
                        }}
                        className={classes['column-list__task-list']}
                      >
                        <TasksList
                          idUser={user.id}
                          columnId={id}
                          onDelete={deleteTaskHandler}
                          onEdit={editTaskHandler}
                          color={
                            (tasks.length > numberOfTasks && numberOfTasks) ||
                            (tasks.filter(({ idUser }) => idUser === user.id)
                              .length > numberOfTasksPerUsers &&
                              numberOfTasksPerUsers &&
                              user.name !== 'Unassigned')
                              ? 'red'
                              : color
                          }
                          tasks={tasks.filter(
                            ({ idUser }) => idUser === user.id
                          )}
                        />
                        {droppableProvided.placeholder}
                      </div>
                      <button
                        className={classes['column-list__add-task-button']}
                        type="button"
                        onClick={() => showModalHandler(id, user.id)}
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
          )
        )}
      </div>
      {manageTaskModalInfo.isOpen && (
        <ManageTaskModal
          modalInfo={manageTaskModalInfo}
          onClose={hideModalHandler}
        />
      )}
    </div>
  );
};
