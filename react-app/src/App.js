import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

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
import configureStore from "./store";

const store = configureStore();

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <NavBar setAuthenticated={setAuthenticated} />
        <Switch>
          <Route path="/login" exact={true}>
            <LoginForm
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
          </Route>
          <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
            <UsersList/>
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
            <User />
          </ProtectedRoute>
          <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
            <HomeComponent />
          </ProtectedRoute>
          <ProtectedRoute path="/party/create" exact={true} authenticated={authenticated}>
            <PartyComponent />
          </ProtectedRoute>
          <ProtectedRoute path="/party/:partyId" exact={true} authenticated={authenticated}>
            <PartyProfileComponent />
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    </ReduxProvider>
  );
}

export default App;
