import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
;

const NavBar = ({ setAuthenticated }) => {
  return (
    <Navbar style={{ height: 90, backgroundColor: "#292F36" }} variant="dark">
      <Navbar.Brand href="/" >Adventure Maps</Navbar.Brand>
      <Nav.Link href="/party/partyId">Your Party</Nav.Link>
      <Nav.Link href="/party/create">Create a Party</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
          <NavDropdown.Divider />
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
          <NavDropdown.Divider />
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
          <NavDropdown.Divider />
          <LogoutButton setAuthenticated={setAuthenticated} />
      </NavDropdown>
    </Navbar>
  );
}

export default NavBar;