import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import PartyComponent from "./components/PartyComponent/index.js"
import HomeComponent from "./components/HomePageComponent/index.js"
import PartyProfileComponent from "./components/PartyProfileComponent/index.js"
import { authenticate } from "./services/auth";
import { currentUser } from "./store/auth"


function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch()

  
  useEffect(() => {
    dispatch(currentUser()).then(() => setLoaded(true))
  }, [dispatch])
  
  if (!loaded) {
    return null;
  }
  return (
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/login" exact={true}>
            <LoginForm/>
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path="/users" exact={true} >
            <UsersList/>
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true} >
            <User />
          </ProtectedRoute>
          <ProtectedRoute path="/" exact={true} >
            <HomeComponent />
          </ProtectedRoute>
          <ProtectedRoute path="/party/create" exact={true} >
            <PartyComponent />
          </ProtectedRoute>
          <ProtectedRoute path="/party/:partyId" exact={true} >
            <PartyProfileComponent />
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
