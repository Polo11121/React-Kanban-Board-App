import { setupModal } from 'shared/helpers/setupModal';
import { render, screen } from 'shared/helpers/test-utils';
import Kanban from 'Pages/Kanban/Kanban';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  setupModal();

  render(<Kanban />);
});

jest.mock('Hooks/useGetColumns', () => ({
  useGetColumns: () => ({
    data: [
      {
        id: '-MxKdzOYa08Z9_ibF2Sj',
        color: '#673ab7',
        name: 'testColumn1',
        numberOfTasks: 12,
        tasks: [
          {
            description: 'Tescior testTask1',
            name: 'testTask1',
            id: '-MxKe4o2p_z42vL_uome',
          },
          {
            description: 'Tescior testTask2',
            name: 'testTask2',
            id: '-MxKe8f2t8AvcSLd_NE6',
          },
        ],
      },
      {
        id: '-MxKe0wJdVkKyPSrxWY4',
        color: '#2196f3',
        name: 'testColumn2',
        numberOfTasks: 5,
        tasks: [
          {
            description: 'Tescior testTask3',
            name: 'testTask3',
            id: '-MxKeDh-ux6qvff4AkHx',
          },
        ],
      },
    ],
  }),
}));

jest.mock('Hooks/useManageColumn', () => ({
  useManageColumn: () => ({
    isLoading: false,
    mutate: jest.fn(),
  }),
}));

describe.skip('Kanban', () => {
  it('should render 2 columns', () => {
    const column1 = screen.getByTestId('testColumn1-column');

    expect(column1).toBeInTheDocument();

    const column2 = screen.getByTestId('testColumn2-column');

    expect(column2).toBeInTheDocument();
  });

  it('should render 3 tasks', () => {
    const task1 = screen.getByTestId('testTask1-task');

    expect(task1).toBeInTheDocument();

    const task2 = screen.getByTestId('testTask2-task');

    expect(task2).toBeInTheDocument();

    const task3 = screen.getByTestId('testTask3-task');

    expect(task3).toBeInTheDocument();
  });

  it('should render add column button', () => {
    const addColumnButton = screen.getByRole('button', { name: 'Add Column' });

    expect(addColumnButton).toBeInTheDocument();
  });

  it('should render add column button', () => {
    const addColumnButton = screen.getByRole('button', {
      name: 'Add Column',
    });

    expect(addColumnButton).toBeInTheDocument();
  });

  it('should render add column button thats open a modal', async () => {
    const addColumnButton = screen.getByRole('button', {
      name: 'Add Column',
    });

    userEvent.click(addColumnButton);

    const modal = screen.getByTestId('manage-column-modal');

    expect(modal).toBeInTheDocument();
  });

  it('should add column modal functionalities work correctly', async () => {
    const addColumnButton = screen.getByRole('button', {
      name: 'Add Column',
    });

    userEvent.click(addColumnButton);

    const modal = screen.getByTestId('manage-column-modal');

    expect(modal).toBeInTheDocument();

    // modal should have colorful title "ADD COLUMN"

    const title = screen.getByText('add column');

    expect(title).toHaveStyle({
      backgroundImage:
        'linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red)',
    });

    // name input should be empty and maximum number of tasks input value should be "" at open

    const maximumNumberOfTasksInput: HTMLInputElement = screen.getByLabelText(
      'Maximum number of tasks'
    );
    const columnNameInput: HTMLInputElement =
      screen.getByLabelText('Column name');

    expect(maximumNumberOfTasksInput.value).toBe('');
    expect(columnNameInput.value).toBe('');

    // button should be disabled at open

    const addColumnModalButton = screen.getByRole('button', {
      name: 'add',
    });

    expect(addColumnModalButton).toBeDisabled();

    // button should be enabled if both values are correct

    userEvent.type(columnNameInput, 'XD');
    userEvent.type(maximumNumberOfTasksInput, '5');

    expect(maximumNumberOfTasksInput.value).toBe('5');
    expect(columnNameInput.value).toBe('XD');
    expect(addColumnModalButton).toBeEnabled();

    // button should be disabled if both values are empty

    userEvent.clear(columnNameInput);
    userEvent.clear(maximumNumberOfTasksInput);

    expect(addColumnModalButton).toBeDisabled();

    // button should be disabled if maximum number of tasks value is incorrect

    await userEvent.type(maximumNumberOfTasksInput, '-4');
    await userEvent.type(columnNameInput, 'XD');

    // exit button should close add column modal

    const closeButton = screen.getByTestId('close-manage-column-modal-icon');

    userEvent.click(closeButton);

    expect(modal).not.toBeInTheDocument();
  });

  it('should edit column modal functionalities work correctly', () => {
    const editColumnButton = screen.getByTestId('column-testColumn1-edit-icon');

    userEvent.click(editColumnButton);

    const modal = screen.getByTestId('manage-column-modal');

    expect(modal).toBeInTheDocument();

    // modal should have colorful title "EDIT COLUMN"

    const title = screen.getByText('edit column');

    expect(title).toHaveStyle({
      backgroundImage:
        'linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red)',
    });

    // name and maximum number of tasks inputs should be equals to column values

    const maximumNumberOfTasksInput: HTMLInputElement = screen.getByLabelText(
      'Maximum number of tasks'
    );
    const columnNameInput: HTMLInputElement =
      screen.getByLabelText('Column name');

    expect(maximumNumberOfTasksInput.value).toBe('12');
    expect(columnNameInput.value).toBe('testColumn1');

    // button should be disabled at open because values are not changed

    const editColumnModalButton = screen.getByRole('button', {
      name: 'edit',
    });

    expect(editColumnModalButton).toBeDisabled();

    // button should be enabled if values are different

    userEvent.type(maximumNumberOfTasksInput, '10');

    expect(editColumnModalButton).toBeEnabled();

    // exit button should close add column modal

    const closeButton = screen.getByTestId('close-manage-column-modal-icon');

    userEvent.click(closeButton);

    expect(modal).not.toBeInTheDocument();
  });

  it('should render three add task buttons thats open a modal', async () => {
    const addTaskbuttons = screen.getAllByRole('button', {
      name: 'Add Task',
    });

    expect(addTaskbuttons.length).toBe(2);
  });

  it('should testColumn1 add task button open open a modal', async () => {
    const addTaskbuttons = screen.getAllByRole('button', {
      name: 'Add Task',
    });

    userEvent.click(addTaskbuttons[0]);

    const modal = screen.getByTestId('manage-task-modal');

    expect(modal).toBeInTheDocument();
  });

  it('should add task modal functionalities work correctly', () => {
    const addTaskbuttons = screen.getAllByRole('button', {
      name: 'Add Task',
    });

    userEvent.click(addTaskbuttons[0]);

    const modal = screen.getByTestId('manage-task-modal');

    expect(modal).toBeInTheDocument();

    // modal should have colorful title "ADD TASK"

    const title = screen.getByText('add task');

    expect(title).toHaveStyle({
      backgroundImage:
        'linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red)',
    });

    // name and description input should be empty at open

    const taskDescriptionName: HTMLInputElement =
      screen.getByLabelText('Description');
    const taskNameInput: HTMLInputElement = screen.getByLabelText('Task name');

    expect(taskDescriptionName.value).toBe('');
    expect(taskNameInput.value).toBe('');

    // button should be disabled at open
    const addTaskModalButton = screen.getByRole('button', {
      name: 'add',
    });

    expect(addTaskModalButton).toBeDisabled();

    // button should be enabled if both values are correct
    userEvent.type(taskNameInput, 'XD');
    userEvent.type(taskDescriptionName, 'XD');

    expect(taskNameInput.value).toBe('');
    expect(taskDescriptionName.value).toBe('');
    expect(addTaskModalButton).toBeDisabled();

    // button should be disabled if both values are empty

    userEvent.clear(taskNameInput);
    userEvent.clear(taskDescriptionName);

    expect(addTaskModalButton).toBeDisabled();

    // exit button should close add task modal

    const closeButton = screen.getByTestId('close-manage-task-modal-icon');

    userEvent.click(closeButton);

    expect(modal).not.toBeInTheDocument();
  });

  it('should edit task modal functionalities work correctly', () => {
    const editTaskbuttons = screen.getByTestId('task-testTask3-edit-icon');

    userEvent.click(editTaskbuttons);

    const modal = screen.getByTestId('manage-task-modal');

    expect(modal).toBeInTheDocument();

    // modal should have colorful title "EDIT TASK"

    const title = screen.getByText('edit task');

    expect(title).toHaveStyle({
      backgroundImage:
        'linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red)',
    });

    // name and description input  should be equals to column values

    const taskDescriptionName: HTMLInputElement =
      screen.getByLabelText('Description');
    const taskNameInput: HTMLInputElement = screen.getByLabelText('Task name');

    expect(taskDescriptionName.value).toBe('Tescior testTask3');
    expect(taskNameInput.value).toBe('testTask3');

    // button should be disabled at open because values are not changed
    const addTaskModalButton = screen.getByRole('button', {
      name: 'edit',
    });

    expect(addTaskModalButton).toBeDisabled();

    // button should be enabled if values are different
    userEvent.clear(taskNameInput);
    userEvent.type(taskNameInput, 'XD');

    expect(taskNameInput.value).toBe('testTask3');
    expect(taskDescriptionName.value).toBe('Tescior testTask3');
    expect(addTaskModalButton).toBeDisabled();

    // exit button should close add task modal

    const closeButton = screen.getByTestId('close-manage-task-modal-icon');

    userEvent.click(closeButton);

    expect(modal).not.toBeInTheDocument();
  });
});
