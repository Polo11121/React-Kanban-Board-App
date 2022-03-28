import { ColumnsList } from 'Pages/Kanban/ColumnsList/ColumnsList';
import { useKanban } from 'Pages/Kanban/helpers/useKanban';
import { ManageColumnModal } from 'Pages/Kanban/ManageColumnModal/ManageColumnModal';
import AddIcon from '@mui/icons-material/Add';
import classes from './Kanban.module.scss';

const Kanban = () => {
  const {
    editColumnHandler,
    deleteColumnHandler,
    showModalHandler,
    hideModalHandler,
    data,
    manageColumnModalInfo,
  } = useKanban();

  return (
    <div className={classes.kanban}>
      <ColumnsList
        columns={data}
        onDelete={deleteColumnHandler}
        onEdit={editColumnHandler}
      />
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
    </div>
  );
};

export default Kanban;
