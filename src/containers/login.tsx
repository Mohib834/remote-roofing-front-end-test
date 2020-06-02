import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from 'store/actions/types';
import { startLoginUser } from 'store/actions/userAuth';
import { AppState } from 'store/reducers';

import AuthCard from 'components/partials/AuthCard';
import { Container, makeStyles } from '@material-ui/core';

type OwnProps = {};
type Props = OwnProps & StoreDispatchProps;

const useStyles = makeStyles((theme) => ({
    login: {
        background:theme.palette.secondary.main,
        height: '100vh',
    },
    loginContainer: {
        height: '100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
}));

const Login: React.FC<Props> = (props) => {
    const { login, loginContainer } = useStyles();
    return (
        <section className={login}>
            <Container className={loginContainer}>
                <AuthCard auth="login"
                  authFunction={props.loginUser}
                />
            </Container>
        </section>
    );
};

type StoreDispatchProps = {
    loginUser: (email: string, password: string) => Promise<unknown>;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any,any,AppActions>): StoreDispatchProps => ({
    loginUser: (email, password) => dispatch(startLoginUser(email, password))
});

export default connect<{}, StoreDispatchProps, OwnProps, AppState>(null, mapDispatchToProps)(Login);