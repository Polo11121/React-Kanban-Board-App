import { useEffect, useState } from 'react';
import { Kanban } from 'Pages/Kanban/Kanban';
import { Main } from 'Pages/Main/Main';
import { Login } from 'Pages/Login/Login';
import { Register } from 'Pages/Register/Register';
import { Header } from 'Components';
import { ToastContainer } from 'react-toastify';
import { Route, Routes, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import classes from './App.module.scss';

export const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<null | string>(null);

  useEffect(() => {
    setIsUserLoggedIn(sessionStorage.getItem('token'));
  }, []);

  const loginUser = (token: string) => setIsUserLoggedIn(token);

  const logoutUser = () => {
    setIsUserLoggedIn(null);
    sessionStorage.clear();
  };

  return (
    <div className={classes.app}>
      <Routes>
        {isUserLoggedIn || sessionStorage.getItem('token') ? (
          <>
            <Route
              path="/"
              element={
                <>
                  <Header onLogout={logoutUser} />
                  <Kanban />
                </>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login onLogin={loginUser} />} />
            <Route
              path="/register"
              element={<Register onRegister={loginUser} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
      <ToastContainer />
    </div>
  );
};
