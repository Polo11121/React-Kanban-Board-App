import { Header } from 'Components';
import Kanban from 'Pages/Kanban/Kanban';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classes from './App.module.scss';

export const App = () => (
  <div className={classes.app}>
    <Header />
    <Kanban />
    <ToastContainer />
  </div>
);
