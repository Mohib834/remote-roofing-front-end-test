import React, { useEffect } from 'react';
import { Switch, Route, withRouter, RouteComponentProps, Redirect } from 'react-router';
import { makeStyles } from '@material-ui/core';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { AppState } from 'store/reducers';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from 'store/actions/types';
import { storeAuthUser } from './store/actions/userAuth';
// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// Containers or Pages
import Home from './containers/home';
import Shows from './containers/shows';
import Show from './containers/show';
import Register from './containers/register';
import Login from './containers/login';
import { ProtectedRoute } from 'components/partials/ProtectedRoute';

type OwnProps = {}
type Props = OwnProps & StoreDispatchProps & StoreStateProps & RouteComponentProps;

const useStyles = makeStyles((theme) => ({
	app: {
		display:'flex',
		flexDirection:'column',
    minHeight: '100vh',
    background: '#181a1b',
   },
   main: {
      minHeight: 550,
   }
}));

const App: React.FC<Props> = (props) => {
  const { app, main } = useStyles();
  const page = props.location.pathname;
  // # When page loads
  // Checking if the user is logged in or not
  // If he is logged in the store the user into redux store
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        props.storeAuthUser(user.uid);
      } else {
        props.storeAuthUser(null);
      }
    });
  }, []);

  // For Full page requirement
  if(page.includes('register')){
    return (
        <div className={app}>
            <Switch>
                <ProtectedRoute 
                  protectAuthPages={true}
                  component={Register}
                  redirect="/"
                  user={props.user}
                />
            </Switch>
        </div>
    );
  }



  if(page.includes('login')){
    return (
        <div className={app}>
            <Switch>
                <ProtectedRoute 
                  protectAuthPages={true}
                  component={Login}
                  redirect="/"
                  user={props.user}
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
                <Route path="/show"
                  render={() => <Show />}
                />
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
  storeAuthUser: (user: string | null) => void;
}

type StoreStateProps = {
  user: string | null;
}

const mapStateToProps = (state: AppState): StoreStateProps => ({
  user: state.userAuth.user
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): StoreDispatchProps => ({
  storeAuthUser: (user) => dispatch(storeAuthUser(user))
});

export default withRouter(connect<StoreStateProps, StoreDispatchProps, OwnProps, AppState>(mapStateToProps, mapDispatchToProps)(App));
