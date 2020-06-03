import { AppActions } from "./types";
import { Dispatch } from "redux";
import { AppState } from "store/reducers";
import firebase from 'firebase';
import { User } from "store/types";

const auth = firebase.auth();
const db = firebase.firestore();

// dispatch
export const storeAuthUser = (user: User): AppActions => ({
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
export const startCreateUserAccount = ({ email, password, username }: {
    email: string;
    password: string;
    username: string;
}) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<unknown> => {
        dispatch(changeAuthLoadingStatus(true));
        // Create user auth with firebase
        return new Promise(async (resolve, reject) => {
            try {
                const res = await auth.createUserWithEmailAndPassword(email, password);
                // Storing the data to redux
                if(res.user?.uid){
                    dispatch(storeAuthUser({
                        uid: res.user.uid,
                        wishlist: [],
                        name: username,
                    }));
                }

                // Creating user in firebase firestore
                await db.collection('users').doc(res.user?.uid).set({
                    uid: res.user?.uid,
                    username,
                    wishlist: [],
                });

                dispatch(changeAuthLoadingStatus(false));

                dispatch(showSnackbar({
                    open: true,
                    message: 'Account created successfully',
                    color: 'success'
                }));
                resolve();
            }
            catch(err){
                console.log(err);
                dispatch(showSnackbar({
                    open: true,
                    message: 'Something went wrong',
                    color: 'error'
                }));
                dispatch(changeAuthLoadingStatus(false));
                reject(err);
            }
        });
    };
};

export const startLoginUser = ({ email, password }: {email: string; password: string}) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<unknown> => {
        dispatch(changeAuthLoadingStatus(true));
        
        return new Promise(async (resolve, reject) => {
            try{
                // Signing in
                const authRes = await auth.signInWithEmailAndPassword(email, password);
                const uid = authRes.user?.uid as string;

                // Fetching user data
                const user = await db.collection('users').doc(uid).get();
                const userData = user.data() as User;

                // Storing redux store
                dispatch(storeAuthUser(userData));

                dispatch(changeAuthLoadingStatus(false));
                
                dispatch(showSnackbar({
                    open: true,
                    message: 'Logged In successfully',
                    color: 'success'
                }));

                resolve();
            }
            catch(err){
                dispatch(changeAuthLoadingStatus(false));
                console.log(err);
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
            }
        });
    };
};
// Fetching user data and storing in redux
export const startFetchUserData = (uid: string) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<undefined> => {
        return new Promise((resolve, reject) => {
            // requestin the user data
            db.collection('users').doc(uid).get().then(snapshot => {
                const userData = snapshot.data() as User;
                // Storing user detail in store
                dispatch(storeAuthUser(userData));
                resolve();
            }).catch(err => {
                console.log(err);
                reject(err);
            });
        });
    };
};