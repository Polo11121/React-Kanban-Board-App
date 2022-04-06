import { Member } from 'Components/Member/Member';
import { useGetMembers } from 'Hooks/useGetMembers';

export const MembersList = () => {
  const { members } = useGetMembers();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        overflowY: 'auto',
        height: '400px',
      }}
    >
      {members
        .sort((memberA, memberB) => memberA.name.localeCompare(memberB.name))
        .map(({ id, name, avatarSrc }) => (
          <Member
            style={{ marginBottom: '1rem' }}
            name={name}
            src={avatarSrc}
            key={id}
          />
        ))}
    </div>
  );
};
