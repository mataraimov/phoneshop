import React from 'react';
import './Navbar.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
interface LinksNavbarTypes {
  text: string;
  path: string;
}
const links: LinksNavbarTypes[] = [{ text: 'a', path: '' }];
const MyNavbar = ({ data = links, ...props }) => {
  const token = window.localStorage.getItem('token');
  return (
    <Navbar collapseOnSelect fixed="top" expand="sm" bg="light">
      <Container>
        <Navbar.Brand>
          <NavLink className={'navbar_logo'} to="/">
            PhoneShop
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="lk_nav">
            {data.map((link) => {
              return (
                <NavLink className="navbar_link" key={link.text} to={link.path}>
                  {link.text}
                </NavLink>
              );
            })}
            {token && (
              <div
                style={{ cursor: 'pointer', color: 'black' }}
                onClick={() => {
                  localStorage.removeItem('token');
                  document.location.replace('/');
                }}
              >
                Выйти
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default MyNavbar;
