import ClearIcon from '@mui/icons-material/Clear';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ReportIcon from '@mui/icons-material/Report';
import { Tooltip } from '@mui/material';

type SectionNameProps = {
  name: string;
  isOpen: boolean;
  sectionNumberOfTasks: number;
  sectionMaximumNumberOfTasks: number;
  hideColumnsHandler: () => void;
  handleRemoveSection: () => void;
};

export const SectionName = ({
  name,
  sectionNumberOfTasks,
  hideColumnsHandler,
  isOpen,
  sectionMaximumNumberOfTasks,
  handleRemoveSection,
}: SectionNameProps) => (
  <div
    style={{
      color: `${
        sectionNumberOfTasks > sectionMaximumNumberOfTasks &&
        sectionMaximumNumberOfTasks
          ? 'red'
          : 'black'
      }`,
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
    {sectionMaximumNumberOfTasks !== 0
      ? `${name} (${sectionNumberOfTasks}/${sectionMaximumNumberOfTasks}) tasks`
      : `${name} ${sectionNumberOfTasks} tasks`}
    {sectionNumberOfTasks > sectionMaximumNumberOfTasks &&
    sectionMaximumNumberOfTasks ? (
      <div style={{ marginLeft: '0.3rem' }}>
        <Tooltip
          placement="bottom"
          title={`Maximum number of tasks allowed in ${name} section has been reached. Close, move or remove task to fix this error!`}
        >
          <ReportIcon fontSize="medium" />
        </Tooltip>
      </div>
    ) : null}
    {name !== 'Unassigned' && <ClearIcon onClick={handleRemoveSection} />}
  </div>
);
