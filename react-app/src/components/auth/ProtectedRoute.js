import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'

const ProtectedRoute = props => {

  const theUser = useSelector((state) => state.currentUser.id)
  return (
    <Route {...props}>
      {theUser ? props.children  : <Redirect to="/login" />}
    </Route>
  )
};


export default ProtectedRoute;
