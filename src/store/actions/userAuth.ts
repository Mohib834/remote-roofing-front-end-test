import { AppActions } from "./types";
import { Dispatch } from "redux";
import { AppState } from "store/reducers";
import firebase from 'firebase';

const auth = firebase.auth();

// dispatch
export const storeAuthUser = (user: string | null): AppActions => ({
    type: "STORE_AUTH_USER",
    user,
}); 

export const changeAuthLoadingStatus = (isLoading: boolean): AppActions => ({
    type: "CHANGE_AUTH_LOADING_STATUS",
    isLoading
});

export const showSnackbar = (snackbar: {open: boolean; message: string; color: "success" | "info" | "warning" | "error"}): AppActions => ({
    type: "SHOW_SNACKBAR",
    snackbar
});

// Thunk dispatch
export const startCreateUserAccount = (email: string, password: string) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<unknown> => {
        dispatch(changeAuthLoadingStatus(true));
        // Create user auth with firebase
        return new Promise((resolve, reject) => {
            auth.createUserWithEmailAndPassword(email, password)
            .then(res => {
                // Storing user uid when Register
                if(res.user?.uid){
                    dispatch(storeAuthUser(res.user?.uid));
                }

                dispatch(changeAuthLoadingStatus(false));

                dispatch(showSnackbar({
                    open: true,
                    message: 'Account created successfully',
                    color: 'success'
                }));
                resolve();
            })
            .catch(err => {
                console.log(err);
                dispatch(showSnackbar({
                    open: true,
                    message: err.message,
                    color: 'error'
                }));
                dispatch(changeAuthLoadingStatus(false));
                reject(err);
            });
        });
    };
};

export const startLoginUser = (email: string, password: string) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<unknown> => {
        dispatch(changeAuthLoadingStatus(true));
        
        return new Promise((resolve, reject) => {
            auth.signInWithEmailAndPassword(email, password)
            .then(res => {
                if(res.user?.uid){
                    // Storing user uid when login
                    dispatch(storeAuthUser(res.user.uid));
                }
                
                dispatch(changeAuthLoadingStatus(false));
                dispatch(showSnackbar({
                    open: true,
                    message: 'Logged In successfully',
                    color: 'success'
                }));
                resolve();
            })
            .catch(err => {
                dispatch(changeAuthLoadingStatus(false));

                let errMessage = err.message;
                if(err.code === 'auth/user-not-found'){
                    errMessage = 'The email address that you\'ve entered doesn\'t match any account.';
                }
                dispatch(showSnackbar({
                    open: true,
                    message: errMessage,
                    color: 'error'
                }));
                reject(err);
            });
        });
    };
};
