import { useKanban } from 'Pages/Kanban/helpers/useKanban';
import { ManageColumnModal } from 'Pages/Kanban/ManageColumnModal/ManageColumnModal';
import { ColumnsHeaders } from 'Pages/Kanban/ColumnsHeaders/ColumnsHeaders';
import { ColumnsList } from 'Pages/Kanban/ColumnsList/ColumnsList';
import { Bench } from 'Pages/Kanban/Bench/Bench';
import { useMove } from 'Pages/Kanban/helpers/useMove';
import { Droppable, DeleteModal } from 'Components';
import { Backdrop, CircularProgress } from '@mui/material';
import { DragDropContext } from 'react-beautiful-dnd';
import AddIcon from '@mui/icons-material/Add';
import classes from './Kanban.module.scss';

export const Kanban = () => {
  const {
    editColumnHandler,
    deleteColumnHandler,
    showModalHandler,
    hideModalHandler,
    columns,
    manageColumnModalInfo,
    setColumns,
    isInitialLoading,
    sections,
    columnsOrder,
    onDelete,
    onCloseDelete,
    deleteInfo,
  } = useKanban();

  const {
    handleMoveTask,
    handleMoveColumn,
    isUserMoved,
    onDragStart,
    isTaskMoved,
    isLoading: isTasksLoading,
    isBenchLoading,
  } = useMove({
    columns,
    columnsOrder,
    setColumns,
  });

  return (
    <div className={classes.kanban}>
      {isInitialLoading || columns === null ? (
        <Backdrop
          open
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <CircularProgress color="success" />
        </Backdrop>
      ) : (
        <DragDropContext onDragEnd={handleMoveTask} onDragStart={onDragStart}>
          <div className={classes['kanban__content']}>
            <DragDropContext onDragEnd={handleMoveColumn}>
              <ColumnsHeaders
                columns={columns}
                onDelete={onDelete}
                onEdit={editColumnHandler}
              />
            </DragDropContext>
            {sections?.map((section) => (
              <ColumnsList
                isTasksLoading={isTasksLoading}
                isDropDisabled={isUserMoved}
                isSections={sections.length > 1}
                key={section.id}
                section={section}
                columns={columns}
              />
            ))}
          </div>
          <div className={classes['kanban__section']}>
            <button
              className={classes['kanban__add-column-button']}
              onClick={showModalHandler}
              type="button"
            >
              <AddIcon />
              Add Column
            </button>
            <Droppable isDisabled={isTaskMoved || isUserMoved} id="bench">
              <Bench isBenchLoading={isBenchLoading} />
            </Droppable>
          </div>
          {deleteInfo.id && (
            <DeleteModal
              onDelete={deleteColumnHandler}
              onClose={onCloseDelete}
              deleteTitle="Column"
              deleteItem={`"${deleteInfo.title}" Column`}
              isDisabled={deleteInfo.warning}
              additionalInfo={
                deleteInfo.warning && 'Remove or move tasks first!'
              }
            />
          )}
          {manageColumnModalInfo.isOpen && (
            <ManageColumnModal
              modalInfo={manageColumnModalInfo}
              onClose={hideModalHandler}
            />
          )}
        </DragDropContext>
      )}
    </div>
  );
};
