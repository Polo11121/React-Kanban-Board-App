import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useCustomToast } from 'shared/helpers/useCustomToast';
import { useQueryClient } from 'react-query';
import { TaskModalInfoType } from 'shared/types/Kanban';
import { useManageColumn } from 'Hooks/useManageColumn';
import { useGetColumns } from 'Hooks/useGetColumns';
import { useGetUsers } from 'Hooks/useGetUsers';

type UseManageTaskModalProps = {
  onClose: () => void;
  modalInfo: TaskModalInfoType;
};

export const useManageTaskModal = ({
  onClose,
  modalInfo,
}: UseManageTaskModalProps) => {
  const queryClient = useQueryClient();
  const [isValuesTouched, setIsValuesTouched] = useState({
    name: false,
    description: false,
  });
  const [inputValues, setInputValues] = useState({
    name: '',
    description: '',
  });
  const { name, description } = inputValues;
  const { columns } = useGetColumns();
  const { users } = useGetUsers();

  const changeNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIsValuesTouched((prevValues) => ({
      ...prevValues,
      name: true,
    }));
    setInputValues((prevValues) => ({
      ...prevValues,
      name: event.target.value,
    }));
  };

  const changeDescriptionHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIsValuesTouched((prevValues) => ({
      ...prevValues,
      description: true,
    }));
    setInputValues((prevValues) => ({
      ...prevValues,
      description: event.target.value,
    }));
  };

  const onSuccess = () => {
    const column = columns.find(({ id }) => id === modalInfo.columnId);
    const userName = users.find(({ id }) => id === modalInfo.idUser)?.name;
    queryClient.invalidateQueries('columns');
    useCustomToast({
      text: `Task successfully ${modalInfo.title}ed`,
      type: 'success',
    });

    if (
      column &&
      column?.tasks.length >= column?.numberOfTasks &&
      column.numberOfTasks
    ) {
      useCustomToast({
        text: `Maximum number of tasks allowed in ${column.name} column has been reached`,
        type: 'error',
        autoClose: 2500,
      });
    } else if (
      column &&
      column?.tasks.filter(({ idUser }) => idUser === modalInfo.idUser)
        .length >= column?.numberOfTasksPerUsers &&
      column?.numberOfTasksPerUsers &&
      userName !== 'Unassigned'
    ) {
      useCustomToast({
        text: `${userName} exceeded maximum  number of tasks allowed in ${column.name} column`,
        type: 'error',
        autoClose: 2500,
      });
    }

    onClose();
  };

  useEffect(() => {
    setInputValues({
      name: modalInfo.name,
      description: modalInfo.description,
    });
  }, []);

  const isNameInvalid = !name.trim().length && isValuesTouched.name;
  const isDescriptionInvalid =
    !description.trim().length && isValuesTouched.description;
  const haveValuesChanged =
    modalInfo.title === 'edit'
      ? name.trim() !== modalInfo.name ||
        description.trim() !== modalInfo.description
      : isValuesTouched.name && isValuesTouched.description;

  const { mutate, isLoading } = useManageColumn(onSuccess);

  const manageTaskHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    modalInfo.title === 'add'
      ? mutate({
          method: 'POST',
          payload: {
            name: name.trim(),
            description: description.trim(),
            column: modalInfo.columnId,
            idUser: modalInfo.idUser,
          },
          endpoint: `tasks`,
        })
      : mutate({
          method: 'PUT',
          payload: {
            name: name.trim(),
            description: description.trim(),
            column: modalInfo.columnId,
            idUser: modalInfo.idUser,
          },
          endpoint: `tasks/${modalInfo.taskId}`,
        });
  };

  return {
    manageTaskHandler,
    changeDescriptionHandler,
    changeNameHandler,
    isLoading,
    isNameInvalid,
    isDescriptionInvalid,
    haveValuesChanged,
    name,
    description,
  };
};
