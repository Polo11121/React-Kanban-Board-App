import AddIcon from '@mui/icons-material/Add';
import { useKanban } from 'Pages/Kanban/helpers/useKanban';
import { useChangeColumnsOrder } from 'Hooks/useChangeColumnsOrder';
import { ManageColumnModal } from 'Pages/Kanban/ManageColumnModal/ManageColumnModal';
import { ColumnsHeaders } from 'Pages/Kanban/ColumnsHeaders/ColumnsHeaders';
import { ColumnsList } from 'Pages/Kanban/ColumnsList/ColumnsList';
import { useMoveTask } from 'Pages/Kanban/helpers/useMoveTask';
import { Backdrop, CircularProgress } from '@mui/material';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useQueryClient } from 'react-query';
import { useCustomToast } from 'shared/helpers/useCustomToast';
import { useState } from 'react';
import classes from './Kanban.module.scss';

const Kanban = () => {
  const [isHeadersLoading, setIsHeadersLoading] = useState(false);
  const queryClient = useQueryClient();

  const {
    editColumnHandler,
    deleteColumnHandler,
    showModalHandler,
    hideModalHandler,
    columns,
    manageColumnModalInfo,
    isLoading,
    sections,
    columnsOrder,
  } = useKanban();

  const onSuccess = () => {
    useCustomToast({ text: 'Column successfully moved', type: 'success' });
    queryClient.invalidateQueries('columns');
    queryClient
      .invalidateQueries('columnsOrder')
      .then(() => setIsHeadersLoading(false));
  };

  const { moveTask, sourceColumnId, destinationColumnId } = useMoveTask();
  const { mutate } = useChangeColumnsOrder(onSuccess);

  const handleMoveTask = (result: DropResult) => {
    const { source, destination } = result;

    if (source.droppableId === destination?.droppableId || !destination) {
      return;
    }

    const task = columns
      .find(({ id }) => id === source.droppableId.split(':')[0])
      ?.tasks.filter(
        ({ idSection }) => idSection === source.droppableId.split(':')[1]
      )[source.index];
    if (task && destination) {
      moveTask({
        task,
        sourceColumnId: source.droppableId,
        destinationColumnId: destination.droppableId,
      });
    }
  };

  const handleMoveColumn = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (destination?.index === source.index || !destination) {
      return;
    }

    setIsHeadersLoading(true);
    const newColumnsOrder = columnsOrder.filter(
      (columnId) => columnId !== draggableId
    );
    mutate({
      columnsOrder: [
        ...newColumnsOrder.slice(0, destination?.index),
        draggableId,
        ...newColumnsOrder.slice(destination?.index),
      ],
    });
  };

  return (
    <div className={classes.kanban}>
      {isLoading ||
      columns.some((column) => column === undefined) ||
      isHeadersLoading ||
      (sourceColumnId && destinationColumnId) ? (
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
        <>
          <div className={classes['kanban__content']}>
            <DragDropContext onDragEnd={handleMoveColumn}>
              <ColumnsHeaders
                columns={columns}
                onDelete={deleteColumnHandler}
                onEdit={editColumnHandler}
              />
            </DragDropContext>
            <DragDropContext onDragEnd={handleMoveTask}>
              {sections?.map((section) => (
                <ColumnsList
                  isSections={sections.length > 1}
                  key={section.id}
                  section={section}
                  columns={columns}
                />
              ))}
            </DragDropContext>
          </div>
          <button
            className={classes['kanban__add-column-button']}
            onClick={showModalHandler}
            type="button"
          >
            <AddIcon />
            Add Column
          </button>
          {manageColumnModalInfo.isOpen && (
            <ManageColumnModal
              modalInfo={manageColumnModalInfo}
              onClose={hideModalHandler}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Kanban;
