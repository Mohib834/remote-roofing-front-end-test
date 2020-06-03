import React from 'react';
import { Redirect } from 'react-router';
import { User } from 'store/types';

type ProtectedRouteProps = {
    component: React.FC;
    redirect: string;
    protectAuthPages: boolean; 
    user: User;
}

type Props = ProtectedRouteProps

export const ProtectedRoute: React.FC<Props> = (props): any => {
  const Component = props.component;
  
  // If user tries to go to login / register page when authenticated
  if(props.protectAuthPages){
    return props.user ? <Redirect to={props.redirect} /> : <Component {...props} />; 
  } else{ // If user tries to go to protected routes without authentication
    return props.user ? <Component {...props} /> : <Redirect to={props.redirect} />;  
  }
};

ProtectedRoute.defaultProps = {
    protectAuthPages: false,
};

export default ProtectedRoute;