import { ChangeEvent, FormEvent, useState } from 'react';
import { useCustomToast } from 'shared/helpers/useCustomToast';
import { useQueryClient } from 'react-query';
import { useAddMember } from './useAddMember';

export const useManageMember = () => {
  const queryClient = useQueryClient();
  const [memberName, setMemberName] = useState('');
  const [isMemberNameTouched, setIsMemberNameTouched] = useState(false);
  const [memberAvatarSrc, setMemberAvatarSrc] = useState('');

  const memberNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIsMemberNameTouched(true);
    setMemberName(event.target.value);
  };

  const memberAvatarSrcHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setMemberAvatarSrc(event.target.value);

  const onSuccess = () => {
    useCustomToast({
      text: `Member ${memberName} successfully added`,
      type: 'success',
    });
    setMemberName('');
    setMemberAvatarSrc('');
    setIsMemberNameTouched(false);
    queryClient.invalidateQueries('members');
  };

  const { mutate } = useAddMember(onSuccess);

  const addMemberHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ memberName, memberAvatarSrc });
  };
  const isMemberNameInvalid = isMemberNameTouched && !memberName.trim();
  return {
    memberName,
    memberNameHandler,
    isMemberNameInvalid,
    memberAvatarSrc,
    memberAvatarSrcHandler,
    addMemberHandler,
  };
};
