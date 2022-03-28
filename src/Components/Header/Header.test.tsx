import { Header } from 'Components';
import { render, screen } from 'shared/helpers/test-utils';

beforeEach(() => {
  render(<Header />);
});

describe.skip('Header', () => {
  it('should render Header component', () => {
    const header = screen.getByTestId('header');

    expect(header).toBeInTheDocument();
  });

  it('should render logo inside Header component', () => {
    const logo = screen.getByRole('img');

    expect(logo).toHaveAttribute('alt', 'logo');
  });

  it('should render logout button inside Header component', () => {
    const logoutButton = screen.getByRole('button');

    expect(logoutButton).toBeInTheDocument();

    const logoutIcon = screen.getByTestId('LogoutIcon');

    expect(logoutIcon).toBeInTheDocument();

    const logoutText = screen.getByText('Logout', { exact: true });

    expect(logoutText).toBeInTheDocument();
  });
});
