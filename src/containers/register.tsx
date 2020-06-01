import React from 'react';
import AuthCard from '../components/partials/AuthCard';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../store/actions/types';


import { makeStyles, Container } from '@material-ui/core';
import { startCreateUserAccount } from 'store/actions/userAuth';
import { AppState } from 'store/reducers';

type OwnProps = {};
type Props = OwnProps & StoreDispatchProps

const useStyles = makeStyles((theme) => ({
    register: {
        background:theme.palette.secondary.main,
        height: '100vh',
    },
    registerContainer: {
        height: '100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
}));

const Register: React.FC<Props> = (props) => {
    const { register, registerContainer } = useStyles();
    const { createUserAccount } = props;


    return (
        <section className={register}>
            <Container className={registerContainer}>
                <AuthCard authFunction={createUserAccount} />
            </Container>
        </section>
    );
};

type StoreDispatchProps = {
    createUserAccount: (email: string, password: string) => Promise<unknown>;
}


const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProps: OwnProps): StoreDispatchProps => ({
    createUserAccount: (email, password) => dispatch(startCreateUserAccount(email, password))
});

export default connect<{}, StoreDispatchProps, OwnProps, AppState>(null, mapDispatchToProps)(Register);