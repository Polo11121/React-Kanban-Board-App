import { ChangeEvent, FormEvent, useState } from 'react';
import { Modal } from 'Components';
import { useAddMember } from 'Hooks/useAddMember';
import { useCustomToast } from 'shared/helpers/useCustomToast';
import { useQueryClient } from 'react-query';
import { Button, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import classes from './AddMemberModal.module.scss';

export const AddMemberModal = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient();
  const [memberName, setMemberName] = useState('');

  const memberNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setMemberName(event.target.value);
  };

  const onSuccess = () => {
    useCustomToast({
      text: `Member ${memberName} successfully added`,
      type: 'success',
    });
    queryClient.invalidateQueries('columns');
    queryClient.invalidateQueries('users');
    onClose();
  };

  const { mutate } = useAddMember(onSuccess);

  const addMemberHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(memberName || 'Unassigned');
  };

  return (
    <Modal onClose={onClose}>
      <form
        onSubmit={addMemberHandler}
        data-testid="add-member-modal"
        className={classes['add-member-modal']}
      >
        <CloseIcon
          data-testid="close-add-member-modal-icon"
          onClick={onClose}
          color="warning"
          className={classes['add-member-modal__exit-button']}
        />
        <h1 className={classes['add-member-modal__title']}>ADD MEMBER</h1>
        <TextField
          data-testid="member-name-input"
          value={memberName}
          onChange={memberNameHandler}
          margin="normal"
          label="Member name"
          color="secondary"
          focused
        />
        <Button type="submit" variant="contained" color="success">
          ADD MEMBER
        </Button>
      </form>
    </Modal>
  );
};
