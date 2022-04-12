import { useEffect, useState } from 'react';
import { TasksList } from 'Pages/Kanban/TasksList/TasksList';
import { ManageTaskModal } from 'Pages/Kanban/ManageTaskModal/ManageTaskModal';
import { useColumnList } from 'Pages/Kanban/helpers/useColumnList';
import { ColumnType } from 'shared/types/Kanban.type';
import { useCustomToast } from 'shared/helpers/useCustomToast';
import { countColumnHeight } from 'shared/helpers/columnHeight';
import { Column, SectionName } from 'Components';
import { Droppable } from 'react-beautiful-dnd';
import AddIcon from '@mui/icons-material/Add';
import classes from './ColumnList.module.scss';

type ColumnsListType = {
  section: { id: string; name: string; taskLimit: number };
  columns: ColumnType[];
  isSections: boolean;
  isDropDisabled: boolean;
  isTasksLoading: boolean;
};

export const ColumnsList = ({
  columns,
  section,
  isSections,
  isDropDisabled,
  isTasksLoading,
}: ColumnsListType) => {
  const [isOpen, setIsOpen] = useState(
    Boolean(localStorage.getItem(section.name))
  );
  const {
    showModalHandler,
    deleteTaskHandler,
    editTaskHandler,
    manageTaskModalInfo,
    hideModalHandler,
    removeSectionHandler,
  } = useColumnList();

  const sectionNumberOfTasks = columns.reduce(
    (sum, column) =>
      sum +
      column.tasks.filter(({ idSection }) => idSection === section.id).length,
    0
  );

  const hideColumnsHandler = () => {
    setIsOpen((prevState) => !prevState);
    if (isOpen) {
      localStorage.setItem(section.name, '');
    } else {
      localStorage.setItem(section.name, 'open');
    }
  };

  const handleRemoveSection = () => {
    if (sectionNumberOfTasks > 0) {
      useCustomToast({
        text: `Remove tasks from ${section.name} section first`,
        type: 'error',
      });
    } else {
      removeSectionHandler(section.id);
    }
  };

  useEffect(() => {
    if (!isSections) {
      localStorage.setItem(section.name, 'open');
      setIsOpen(true);
    }
  }, [isSections]);

  return (
    <div className={classes['column-list__content']}>
      {isSections && (
        <SectionName
          name={section.name}
          isOpen={isOpen}
          handleRemoveSection={handleRemoveSection}
          hideColumnsHandler={hideColumnsHandler}
          sectionMaximumNumberOfTasks={section.taskLimit}
          sectionNumberOfTasks={sectionNumberOfTasks}
        />
      )}
      <div style={{ display: `${isOpen ? 'flex' : 'none'}` }}>
        {columns?.map(({ name, color, id, tasks, numberOfTasks }) => (
          <Droppable
            isDropDisabled={isDropDisabled}
            key={id}
            droppableId={`${id}:${section.id}`}
          >
            {(droppableProvided) => (
              <div
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <Column title={name}>
                  <>
                    <div
                      style={{ minHeight: countColumnHeight(columns, section) }}
                      className={classes['column-list__task-list']}
                    >
                      <TasksList
                        isTasksLoading={isTasksLoading}
                        isDropDisabled={!isDropDisabled}
                        idSection={section.id}
                        columnId={id}
                        onDelete={deleteTaskHandler}
                        onEdit={editTaskHandler}
                        color={
                          tasks.length > numberOfTasks && numberOfTasks
                            ? 'red'
                            : color
                        }
                        tasks={tasks.filter(
                          ({ idSection }) => idSection === section.id
                        )}
                      />
                      {droppableProvided.placeholder}
                    </div>
                    <button
                      className={classes['column-list__add-task-button']}
                      type="button"
                      onClick={() => showModalHandler(id, section.id)}
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
