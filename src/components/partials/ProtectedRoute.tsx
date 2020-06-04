import React from 'react';
import { Redirect, RouteProps, Route } from 'react-router';
import { User } from 'store/types';

type ProtectedRouteProps = {
    redirect: string;
    protectAuthPages?: boolean; 
    user: User;
}

type Props = ProtectedRouteProps & RouteProps

export const ProtectedRoute: React.FC<Props> = (props): any => {
  // If user tries to go to login / register page when authenticated
  if(props.protectAuthPages){
    return props.user ? <Redirect to={props.redirect} /> :  <Route {...props}
      component={props.component}
    />; 
  } else{ // If user tries to go to protected routes without authentication
    return props.user ? <Route {...props}
      component={props.component}
    />  : <Redirect to={props.redirect} />;  
  }
};

ProtectedRoute.defaultProps = {
    protectAuthPages: false,
};

export default ProtectedRoute;