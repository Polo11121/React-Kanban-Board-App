import { Column } from 'Components';
import { render, screen } from 'shared/helpers/test-utils';

describe.skip('Column', () => {
  it('should render Column component', () => {
    const column = screen.getByTestId('columnTitle-column');

    expect(column).toBeInTheDocument();
  });

  it('should Column have title "columnTitle"', () => {
    const title = screen.getByText('columnTitle');

    expect(title).toBeInTheDocument();
  });

  it('should Column have exact number of tasks', () => {
    const numberOfTasks = screen.getByText('0/69');

    expect(numberOfTasks).toBeInTheDocument();
  });

  it('should Column component header have delete icon and edit icon', () => {
    const deleteIcon = screen.getByTestId('column-columnTitle-delete-icon');

    expect(deleteIcon).toBeInTheDocument();

    const editIcon = screen.getByTestId('column-columnTitle-edit-icon');

    expect(editIcon).toBeInTheDocument();
  });
});
