import ClearIcon from '@mui/icons-material/Clear';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

type MemberNameProps = {
  name: string;
  isOpen: boolean;
  memberNumberOfTasks: number;
  hideColumnsHandler: () => void;
  handleRemoveMember: () => void;
};

export const MemberName = ({
  name,
  memberNumberOfTasks,
  hideColumnsHandler,
  isOpen,
  handleRemoveMember,
}: MemberNameProps) => (
  <div
    style={{
      backgroundColor: 'white',
      display: 'flex',
      cursor: 'pointer',
      marginLeft: '1rem',
      position: 'sticky',
      top: '57px',
      zIndex: 3,
    }}
  >
    {isOpen ? (
      <ArrowDropDownIcon onClick={hideColumnsHandler} />
    ) : (
      <ArrowRightIcon onClick={hideColumnsHandler} />
    )}
    {`${name} (${memberNumberOfTasks} tasks) `}
    <ClearIcon onClick={handleRemoveMember} />
  </div>
);
