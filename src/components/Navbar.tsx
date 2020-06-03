import firebase from 'firebase';
import React, { useEffect, useState, Dispatch } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from 'store/reducers';

import { AppBar, Toolbar, Button, Typography, Container, makeStyles } from '@material-ui/core';
import { User } from 'store/types';
import { AppActions } from 'store/actions/types';
import { storeAuthUser } from 'store/actions/userAuth';

type OwnProps = {};
type Props = OwnProps & RouteComponentProps & StoreStateProps & StoreDispatchProps

const useStyles = makeStyles(theme => ({
	title: {
    flexGrow: 1,
    fontWeight: 500,
	},
	login: {
		marginRight: theme.spacing(2),
	}
}));

const Navbar: React.FC<Props> = (props) => {
  const classes = useStyles();

  const [userAuth, setUserAuth] = useState(false);

  const logout = () => {
    firebase.auth().signOut().
    then(() => {
      props.storeAuthUser(null);
      props.history.push('/login');
    });
    // Redirect to login page
  };

  useEffect(() => {
    if(props.user){
      setUserAuth(true);
    } else {
      setUserAuth(false);
    }
  }, [props.user]);

  const renderNavBtn = () => {
    // Show navbar buttons (login logout etc) according to user auth
    if(!userAuth) {
      return  (
          <React.Fragment>
              <Button
                size="small"
                onClick={() => props.history.push('/login')}
                className={classes.login}
                color="inherit"
              >Log in</Button>
              <Button variant="contained"
                size="small"
                color="secondary"
                onClick={() => props.history.push('/register')}
              >Start your free trial</Button>
          </React.Fragment>
      );
    } else {
      return  (<Button
        size="small"
        className={classes.login}
        color="inherit"
        onClick={logout}
      >Log out</Button>);
    }
  }; 

	return (
    <AppBar position="static"
      elevation={0}
    >
        <Container>
            <Toolbar style={{ padding: 0 }}>
                <Typography
                  variant="h5"
                  className={classes.title}
                >
                    <Link to="/"
                      style={{ textDecoration: 'none', color: '#fff' }}
                    >
                        DEMO Streaming
                    </Link>
                </Typography>
                {renderNavBtn()}
            </Toolbar>
        </Container>
    </AppBar>
	);
};

type StoreStateProps = {
  user: User;
}

type StoreDispatchProps = {
  storeAuthUser: (user: User) => void; 
}

const mapStateToProps = (state: AppState): StoreStateProps => ({
  user: state.userAuth.user,
});

const mapDispatchToProps = (dispatch: Dispatch<AppActions>): StoreDispatchProps => ({
  storeAuthUser: (user) => dispatch(storeAuthUser(user))
});

export default withRouter(connect<StoreStateProps, StoreDispatchProps, OwnProps, AppState>(mapStateToProps, mapDispatchToProps)(Navbar));