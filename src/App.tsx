import React, { useEffect, useState } from 'react';
import { Switch, Route, withRouter, RouteComponentProps, Redirect } from 'react-router';
import { makeStyles } from '@material-ui/core';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { AppState } from 'store/reducers';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from 'store/actions/types';
import { startFetchUserData } from './store/actions/userAuth';
import { User } from 'store/types';
import { ProtectedRoute } from 'components/partials/ProtectedRoute';
// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// Containers or Pages
import Home from './containers/home';
import Shows from './containers/shows';
import Show from './containers/show';
import Register from './containers/register';
import Login from './containers/login';
import Account from './containers/account';
import CircularLoader from 'components/partials/CircularLoader';

type OwnProps = {}
type Props = OwnProps & StoreDispatchProps & StoreStateProps & RouteComponentProps;

const useStyles = makeStyles((theme) => ({
	app: {
		display:'flex',
		flexDirection:'column',
    minHeight: '100vh',
   },
   main: {
      minHeight: 550,
   }
}));

const App: React.FC<Props> = (props) => {
  const { app, main } = useStyles();
  const page = props.location.pathname;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // # When page loads 
    setIsLoading(true); 
    // Checking if the user is logged in or not
    // If he is logged in the store the userData into redux store
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        props.fetchUserData(user.uid)
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  // Wait for getting the user data from the server 
  if(isLoading) return <CircularLoader fullHeight />;
  // Then render the child component ( Child component depends over this data [user] )

  // For Full page requirement
  if(page === '/register'){
    return (
        <div className={app}>
            <Switch>
                <ProtectedRoute 
                  path="/register"
                  protectAuthPages={true}
                  redirect="/"
                  user={props.user}
                >
                    <Register />
                </ProtectedRoute>
            </Switch>
        </div>
    );
  }

  if(page === '/login'){
    return (
        <div className={app}>
            <Switch>
                <ProtectedRoute 
                  path="/login"
                  protectAuthPages={true}
                  redirect="/"
                  user={props.user}
                >
                    <Login />
                </ProtectedRoute>
            </Switch>
        </div>
    );
  }

  if(page === '/show'){
    return (
        <div className={app}>
            <Switch>
                <Route path="/show"
                  render={() => <Show />}
                />
            </Switch>
        </div>
    );
  }

	return (
    <div className={app}>
        {/* navigation bar */}
        <Navbar />
        {/* main content */}
        <main className={main}>
            <Switch>
                <Route
                  path="/shows"
                  render={() => <Shows />}
                />
                <ProtectedRoute 
                  path="/account"
                  redirect="/"
                  user={props.user}
                >
                    <Account />
                </ProtectedRoute>
                <Route 
                  path="/"
                  render={() => <Home />}
                />
            </Switch>
        </main>

        <Footer />
    </div>
	);
};

type StoreDispatchProps = {
  fetchUserData: (uid: string) => Promise<void>;
}

type StoreStateProps = {
  user: User;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): StoreDispatchProps => ({
  fetchUserData: (uid) => dispatch(startFetchUserData(uid)),
});

const mapStateToProps = (state: AppState): StoreStateProps => ({
  user: state.userAuth.user,
});

export default withRouter(connect<StoreStateProps, StoreDispatchProps, OwnProps, AppState>(mapStateToProps, mapDispatchToProps)(App));
