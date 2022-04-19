import { Tooltip } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ReportIcon from '@mui/icons-material/Report';
import classes from './SectionName.module.scss';

type SectionNameProps = {
  name: string;
  isOpen: boolean;
  sectionId: string;
  sectionNumberOfTasks: number;
  sectionMaximumNumberOfTasks: number;
  hideColumnsHandler: () => void;
  handleRemoveSection: ({
    title,
    name,
    id,
    warning,
  }: {
    title: string;
    name: string;
    id: string;
    warning: boolean;
  }) => void;
};

export const SectionName = ({
  name,
  sectionId,
  sectionNumberOfTasks,
  hideColumnsHandler,
  isOpen,
  sectionMaximumNumberOfTasks,
  handleRemoveSection,
}: SectionNameProps) => (
  <div
    data-testid={`section-name-${name}`}
    className={classes['section-name']}
    style={{
      color: `${
        sectionNumberOfTasks > sectionMaximumNumberOfTasks &&
        sectionMaximumNumberOfTasks
          ? 'red'
          : 'black'
      }`,
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
    {name !== 'Unassigned' && (
      <ClearIcon
        data-testid={`section-name-${name}-delete-icon`}
        onClick={() =>
          handleRemoveSection({
            name,
            id: sectionId,
            title: 'Section',
            warning: Boolean(sectionNumberOfTasks),
          })
        }
      />
    )}
  </div>
);
