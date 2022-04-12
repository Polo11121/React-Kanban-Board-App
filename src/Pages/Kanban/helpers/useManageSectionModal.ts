import { ChangeEvent, FormEvent, useState } from 'react';
import { useAddSection } from 'Hooks/useAddSection';
import { useCustomToast } from 'shared/helpers/useCustomToast';
import { useQueryClient } from 'react-query';

export const useManageSectionModal = (onClose: () => void) => {
  const queryClient = useQueryClient();
  const [sectionName, setSectionName] = useState('');
  const [isSectionNameTouched, setIsSectionNameTouched] = useState(false);
  const [sectionMaximumNumberOfTasks, setSectionMaximumNumberOfTasks] =
    useState('');
  const [
    isSectionMaximumNumberOfTasksTouched,
    setIsSectionMaximumNumberOfTasksTouched,
  ] = useState(false);

  const sectionNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIsSectionNameTouched(true);
    setSectionName(event.target.value);
  };

  const sectionMaximumNumberOfTasksHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setIsSectionMaximumNumberOfTasksTouched(true);
    setSectionMaximumNumberOfTasks(event.target.value);
  };

  const isSectionMaximumNumberOfTasksInvalid =
    !sectionMaximumNumberOfTasks.trim().match(/^[0-9]+[0-9]*$/) &&
    isSectionMaximumNumberOfTasksTouched;

  const isSectionNameInvalid = !sectionName.trim() && isSectionNameTouched;

  const onSuccess = () => {
    useCustomToast({
      text: `Section ${sectionName} successfully added`,
      type: 'success',
    });
    queryClient.invalidateQueries('columns');
    queryClient.invalidateQueries('sections');
    onClose();
  };

  const mutate = useAddSection(onSuccess);

  const addSectionHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ sectionName, sectionMaximumNumberOfTasks });
  };

  const isDisabled =
    !sectionName ||
    !sectionMaximumNumberOfTasks ||
    isSectionNameInvalid ||
    isSectionMaximumNumberOfTasksInvalid;

  return {
    addSectionHandler,
    sectionName,
    sectionNameHandler,
    sectionMaximumNumberOfTasks,
    sectionMaximumNumberOfTasksHandler,
    isSectionNameInvalid,
    isSectionMaximumNumberOfTasksInvalid,
    isDisabled,
  };
};
