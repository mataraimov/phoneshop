import React from 'react';
import { Route, Routes } from 'react-router';
import { RequiredAuth } from './components/RequiredAuth';
import Admin from './pages/Admin/Admin';
import CreateDrink from './pages/Admin/components/Drinks/CreateDrink';
import Drinks from './pages/Admin/components/Drinks/Drinks';
import Orders from './pages/Admin/components/Orders/Orders';
import Auth from './pages/Auth/Auth';
import Drink from './pages/Drink/Drink';
import MyOrders from './pages/Lk/components/MyOrders/MyOrders';
import Brands from './pages/Admin/components/Brands/Brands';
import MyBasket from './pages/Lk/components/Basket/Basket';
import Lk from './pages/Lk/Lk';
import Main from './pages/Main/Main';
import roles from './utils/roles';
import { Reports } from './pages/Admin/components/Reports/Reports';

export const MyRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<Main />} path="/" />
      <Route element={<Auth />} path="/auth" />
      <Route element={<Drink />} path="/projections/:id" />
      <Route
        element={
          <RequiredAuth roles={[roles.ADMIN]}>
            <Admin />
          </RequiredAuth>
        }
        path="admin"
      >
        <Route element={<Brands />} index />
        <Route element={<Drinks />} path="projections" />
        <Route element={<Orders />} path="orders" />
        <Route element={<Reports />} path="reports" />
        <Route element={<CreateDrink />} path="createPhone" />
      </Route>
      <Route
        element={
          <RequiredAuth roles={[roles.USER]}>
            <Lk />
          </RequiredAuth>
        }
        path="lk"
      >
        <Route element={<MyBasket />} index />
        <Route element={<MyOrders />} path="orders" />
      </Route>
    </Routes>
  );
};
