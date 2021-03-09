import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import LogoutButton from './auth/LogoutButton';
import { currentUser } from "../store/auth"
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
;

const NavBar = () => {

  const theUser = useSelector(state => state.currentUser)
  const dispatch = useDispatch()

      useEffect(() => {
        dispatch(currentUser())
    }, [dispatch])

  const partyId = 1
  return (
    <Navbar sticky="top" style={{ height: 90, backgroundColor: "#292F36" }} variant="dark">
      <Navbar.Brand href="/" >Adventure Maps</Navbar.Brand>
      <Nav.Link href={`/party/${theUser.party_id}`}>Your Party</Nav.Link>
      <Nav.Link href="/party/create">Create a Party</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <Nav.Link href="/" exact={true} activeClassName="active">
            Home
        </Nav.Link>
          <NavDropdown.Divider />
          <Nav.Link href="/login" exact={true} activeClassName="active">
            Login
          </Nav.Link>
          <NavDropdown.Divider />
          <Nav.Link href="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </Nav.Link>
          <NavDropdown.Divider />
          <LogoutButton />
      </NavDropdown>
    </Navbar>
  );
}

export default NavBar;