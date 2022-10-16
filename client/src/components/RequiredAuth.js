import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hook';

export const RequiredAuth = ({ children, roles }) => {
  let location = useLocation();
  const successLogin =
    useAppSelector((state) => state.auth.login.token) || localStorage.getItem('token');
  const role = useSelector((state) => state.auth.login.role);
  const roleState = useSelector((state) => state.auth.getRole);
  const userHasRequiredRole = roles.includes(role) ? true : false;
  if (!successLogin) {
    return <Navigate to="/auth" state={{ from: location }} />;
  }
  if (roleState.success && successLogin && !userHasRequiredRole) {
    return <Navigate to={role === 'admin' ? '/admin' : '/lk'} state={{ from: location }} />;
  }

  return children;
};
