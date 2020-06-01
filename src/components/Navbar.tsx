import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from 'store/reducers';
import firebase from 'firebase';

import { AppBar, Toolbar, Button, Typography, Container, makeStyles } from '@material-ui/core';

type OwnProps = {};
type Props = OwnProps & RouteComponentProps & StoreStateProps

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

  const logout = () => {
    firebase.auth().signOut();
    // Redirect to login page
    props.history.push('/login');
  };

  const renderNavBtn = () => {
      // Show navbar buttons (login logout etc) according to user auth
    if(!props.user) {
      return  (
          <React.Fragment>
              <Button
                size="small"
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
  user: string | null;
}

const mapStateToProps = (state: AppState): StoreStateProps => ({
  user: state.userAuth.user
});

export default withRouter(connect(mapStateToProps)(Navbar));