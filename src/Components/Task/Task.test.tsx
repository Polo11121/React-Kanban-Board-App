import { setupModal } from 'shared/helpers/setupModal';
import { Task } from 'Components';
import { render, screen } from 'shared/helpers/test-utils';

beforeEach(() => {
  setupModal();

  render(
    <Task
      color="#fff"
      title="testTitle"
      description="testDescription"
      columnId="testId"
      id="taskId"
      idUser="elo"
      onDelete={jest.fn()}
      onEdit={jest.fn()}
    />
  );
});

describe('Task', () => {
  it('should render Task component', () => {
    const task = screen.getByRole('article');

    expect(task).toBeInTheDocument();
  });

  it('should Task component have correct title and description', () => {
    const taskTitle = screen.getByText('testTitle', { exact: true });

    expect(taskTitle).toBeInTheDocument();

    const taskDescription = screen.getByText('testDescription', {
      exact: true,
    });

    expect(taskDescription).toBeInTheDocument();
  });

  it('should Task component header have correct title background color "#fff"', () => {
    const taskHeader = screen.getByText('testTitle', { exact: true });

    expect(taskHeader).toHaveStyle({ backgroundColor: '#fff' });
  });

  it('should Task component header have delete icon and edit icon', () => {
    const deleteIcon = screen.getByTestId('task-testTitle-delete-icon');

    expect(deleteIcon).toBeInTheDocument();

    const editIcon = screen.getByTestId('task-testTitle-edit-icon');

    expect(editIcon).toBeInTheDocument();
  });
});
