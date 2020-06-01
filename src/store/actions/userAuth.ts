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
                dispatch(changeAuthLoadingStatus(false));
                reject(err);
            });
        });
    };
};
