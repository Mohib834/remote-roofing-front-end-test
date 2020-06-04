import firebase from 'firebase';
import React, { useEffect, useState, Dispatch } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from 'store/reducers';
import { User } from 'store/types';
import { AppActions } from 'store/actions/types';
import { storeAuthUser } from 'store/actions/userAuth';

import { AppBar, Toolbar, Button, Typography, Container, makeStyles, Avatar, Menu, MenuItem, IconButton } from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';


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

  // Menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //--

  const logout = () => {
    firebase.auth().signOut().
    then(() => {
      props.storeAuthUser(null);
      // Redirect to login page
      props.history.push('/login');
    });
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
      return  (
          <React.Fragment>
              {/* Menu */}
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                  <MoreVertIcon style={{ color: '#fff' }} />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: -110 }}
                keepMounted
                open={open}
                onClose={handleClose}
              >
                  <MenuItem
                    component={Link}
                    to="/account"
                    onClick={handleClose}
                  >
                      My Account
                  </MenuItem>
                  <MenuItem
                    onClick={logout}
                  >
                      Logout
                  </MenuItem>
              </Menu>
          </React.Fragment>
      );
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