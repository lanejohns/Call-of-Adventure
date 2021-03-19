import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button'

import LogoutButton from './auth/LogoutButton';
import { currentUser } from "../store/auth"
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
;

const NavBar = () => {

  const theUser = useSelector(state => state.currentUser)
  const dispatch = useDispatch()
  const history = useHistory()

      useEffect(() => {
        dispatch(currentUser())
    }, [dispatch])
  
    
    const partyClick = () => {
      history.push(`/party/${theUser.party_id}`)
  }

    const partyCreateClick = () => {
      history.push("/party/create")
    }
  
  const loginClick = () => {
    history.push("/login")
  }

  const homeClick = () => {
    history.push("/")
  }
  
  const signupClick = () => {
    history.push("/sign-up")
  }
  
  let sessionLinks;
  if (theUser.party_id != null) {
    sessionLinks = (
    <>
      {/* <Nav.Link href={`/party/${theUser.party_id}`}>Your Party</Nav.Link> */}
      <Button className="m-2" variant="outline-light" onClick={partyClick}>Your Party</Button>
    </>
    )
  } else {
    sessionLinks = (
      <>
        {/* <Nav.Link href="/party/create">Create a Party</Nav.Link> */}
        <Button className="m-2" variant="outline-light" onClick={partyCreateClick}>Create Party</Button>
      </>
    )
  }

  return (
    <Navbar sticky="top" style={{ height: 90, backgroundColor: "#292F36" }} variant="dark">
      <Navbar.Brand href="/" >Call of Adventure</Navbar.Brand>
      {/* <Nav.Link href={`/party/${theUser.party_id}`}>Your Party</Nav.Link>
      <Nav.Link href="/party/create">Create a Party</Nav.Link> */}
      {theUser.id && sessionLinks}
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <Button className="m-2" variant="dark" onClick={homeClick}>
            Home
        </Button>
          <NavDropdown.Divider />
          {/* <Nav.Link href="/login" exact={true} activeClassName="active">
            Login
          </Nav.Link> */}
          <Button className="m-2" variant="dark" onClick={loginClick}>
            Login
          </Button>
          <NavDropdown.Divider />
          {/* <Nav.Link href="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </Nav.Link> */}
          <Button className="m-2" variant="dark" onClick={signupClick}>
            Sign Up
          </Button>
          <NavDropdown.Divider />
          <LogoutButton />
      </NavDropdown>
    </Navbar>
  );
}

export default NavBar;