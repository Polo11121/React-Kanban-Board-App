import AddIcon from '@mui/icons-material/Add';
import { useKanban } from 'Pages/Kanban/helpers/useKanban';
import { ManageColumnModal } from 'Pages/Kanban/ManageColumnModal/ManageColumnModal';
import { ColumnsHeaders } from 'Pages/Kanban/ColumnsHeaders/ColumnsHeaders';
import { ColumnsList } from 'Pages/Kanban/ColumnsList/ColumnsList';
import { useMoveTask } from 'Pages/Kanban/helpers/useMoveTask';
import { Backdrop, CircularProgress } from '@mui/material';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import classes from './Kanban.module.scss';

const Kanban = () => {
  const {
    editColumnHandler,
    deleteColumnHandler,
    showModalHandler,
    hideModalHandler,
    columns,
    manageColumnModalInfo,
    isLoading,
    users,
  } = useKanban();

  const { moveTask, sourceColumnId, destinationColumnId } = useMoveTask();

  const handleMoveTask = (result: DropResult) => {
    const { source, destination } = result;

    if (source.droppableId === destination?.droppableId || !destination) {
      return;
    }

    const task = columns
      .find(({ id }) => id === source.droppableId.split(':')[0])
      ?.tasks.filter(
        ({ idUser }) => idUser === source.droppableId.split(':')[1]
      )[source.index];
    if (task && destination) {
      moveTask({
        task,
        sourceColumnId: source.droppableId,
        destinationColumnId: destination.droppableId,
      });
    }
  };

  return (
    <div className={classes.kanban}>
      {isLoading || (sourceColumnId && destinationColumnId) ? (
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
            <ColumnsHeaders
              columns={columns}
              onDelete={deleteColumnHandler}
              onEdit={editColumnHandler}
            />
            <DragDropContext onDragEnd={handleMoveTask}>
              {users
                .sort((userA, userB) =>
                  userA.name === 'Unassigned' || userB.name === 'Unassigned'
                    ? -1
                    : userA.name.localeCompare(userB.name)
                )
                .map((user) => (
                  <ColumnsList key={user.id} user={user} columns={columns} />
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
