import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useManageColumn } from 'Hooks/useManageColumn';
import { useCustomToast } from 'shared/helpers/useCustomToast';
import { ColorResult } from 'react-color';
import { useQueryClient } from 'react-query';
import { ColumnModalInfoType } from 'shared/types/Kanban';

type useManageColumnModalProps = {
  onClose: () => void;
  modalInfo: ColumnModalInfoType;
};

export const useManageColumnModal = ({
  onClose,
  modalInfo,
}: useManageColumnModalProps) => {
  const queryClient = useQueryClient();
  const [color, setColor] = useState('#2e7d32');
  const [isValuesTouched, setIsValuesTouched] = useState({
    name: false,
    numberOfTasks: false,
    numberOfTasksPerMember: false,
  });
  const [inputValues, setInputValues] = useState({
    name: '',
    numberOfTasks: '',
    numberOfTasksPerMember: '',
  });
  const { name, numberOfTasks, numberOfTasksPerMember } = inputValues;

  const changeNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      name: event.target.value,
    }));
    setIsValuesTouched((prevValues) => ({
      ...prevValues,
      name: true,
    }));
  };

  const changeNumberOfTasksHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      numberOfTasks: event.target.value,
    }));
    setIsValuesTouched((prevValues) => ({
      ...prevValues,
      numberOfTasks: true,
    }));
  };

  const changeNumberOfTasksPerMemberHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      numberOfTasksPerMember: event.target.value,
    }));
    setIsValuesTouched((prevValues) => ({
      ...prevValues,
      numberOfTasksPerMember: true,
    }));
  };

  const changeColorHandler = (pickedColor: ColorResult) =>
    setColor(pickedColor.hex);

  const onSuccess = () => {
    queryClient.invalidateQueries('columns');
    useCustomToast({
      text: `Column successfully ${modalInfo.title}ed`,
      type: 'success',
    });
    onClose();
  };

  useEffect(() => {
    if (modalInfo.title === 'edit') {
      setInputValues({
        name: modalInfo.name,
        numberOfTasks: `${modalInfo.numberOfTasks}`,
        numberOfTasksPerMember: `${modalInfo.numberOfTasksPerMember}`,
      });
      setColor(modalInfo.color);
    }
  }, []);

  const isNameInvalid = !name.trim().length && isValuesTouched.name;
  const isNumberOfTasksInvalid =
    !numberOfTasks.trim().match(/^[0-9]+[0-9]*$/) &&
    isValuesTouched.numberOfTasks;

  const isNumberOfTasksPerMemberInvalid =
    !numberOfTasksPerMember.trim().match(/^[0-9]+[0-9]*$/) &&
    isValuesTouched.numberOfTasksPerMember;

  const haveValuesChanged =
    modalInfo.title === 'edit'
      ? name.trim() !== modalInfo.name ||
        +numberOfTasks !== modalInfo.numberOfTasks ||
        +numberOfTasksPerMember !== modalInfo.numberOfTasksPerMember ||
        color !== modalInfo.color
      : isValuesTouched.name && isValuesTouched.numberOfTasks;

  const { mutate, isLoading } = useManageColumn(onSuccess);

  const manageColumnHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    modalInfo.title === 'add'
      ? mutate({
          method: 'POST',
          payload: {
            color,
            name: name.trim(),
            numberOfTasks: +numberOfTasks,
            numberOfTasksPerUsers: +numberOfTasksPerMember,
          },
          endpoint: 'columns',
        })
      : mutate({
          method: 'PUT',
          payload: {
            color,
            name: name.trim(),
            numberOfTasks: +numberOfTasks,
            numberOfTasksPerUsers: +numberOfTasksPerMember,
          },
          endpoint: `columns/${modalInfo.id}`,
        });
  };

  return {
    manageColumnHandler,
    changeColorHandler,
    changeNumberOfTasksHandler,
    changeNumberOfTasksPerMemberHandler,
    changeNameHandler,
    isLoading,
    isNameInvalid,
    isNumberOfTasksInvalid,
    isNumberOfTasksPerMemberInvalid,
    haveValuesChanged,
    color,
    name,
    numberOfTasks,
    numberOfTasksPerMember,
  };
};
