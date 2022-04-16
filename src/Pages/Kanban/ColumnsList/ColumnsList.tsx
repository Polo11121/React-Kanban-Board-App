import { useEffect, useState } from 'react';
import { TasksList } from 'Pages/Kanban/TasksList/TasksList';
import { ManageTaskModal } from 'Pages/Kanban/ManageTaskModal/ManageTaskModal';
import { useColumnList } from 'Pages/Kanban/helpers/useColumnList';
import { ColumnType } from 'shared/types/Kanban.type';
import { countColumnHeight } from 'shared/helpers/columnHeight';
import { Column, DeleteModal, SectionName } from 'Components';
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
    deleteInfo,
    onCloseDelete,
    onDelete,
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
          sectionId={section.id}
          isOpen={isOpen}
          handleRemoveSection={onDelete}
          hideColumnsHandler={hideColumnsHandler}
          sectionMaximumNumberOfTasks={section.taskLimit}
          sectionNumberOfTasks={sectionNumberOfTasks}
        />
      )}
      <div style={{ display: `${isOpen ? 'flex' : 'none'}` }}>
        {columns?.map(({ name, id, tasks }) => (
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
                        onDelete={onDelete}
                        onEdit={editTaskHandler}
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
      {deleteInfo.id && (
        <DeleteModal
          onDelete={
            deleteInfo.title === 'Section'
              ? removeSectionHandler
              : deleteTaskHandler
          }
          onClose={onCloseDelete}
          deleteTitle={deleteInfo.title}
          deleteItem={`"${deleteInfo.name}" ${deleteInfo.title}`}
          isDisabled={deleteInfo.warning}
          additionalInfo={deleteInfo.warning && 'Remove or move tasks first!'}
        />
      )}
      {manageTaskModalInfo.isOpen && (
        <ManageTaskModal
          modalInfo={manageTaskModalInfo}
          onClose={hideModalHandler}
        />
      )}
    </div>
  );
};
