import { AppActions } from "./types";
import { Dispatch } from "redux";
import { AppState } from "store/reducers";
import firebase from 'firebase';
import { User } from "store/types";

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

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

                if(!res.user) throw new Error();

                const user: User = {
                    uid: res.user.uid,
                    userEmail: email,
                    wishlist: {
                        movie: [],
                        tv: [],
                    },
                    name: username,
                };

                // Storing the data to redux
                if(res.user?.uid){
                    dispatch(storeAuthUser(user));
                }

                // Creating user in firebase firestore
                await db.collection('users').doc(res.user?.uid).set(user);

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
                console.log(err.message);

                let message = "Something went wrong";

                if(err.code === 'auth/email-already-in-use'){
                    message = "Email already in use";
                }

                dispatch(showSnackbar({
                    open: true,
                    message: message,
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
               
                let errMessage = err.message;
               
                if(err.code === 'auth/user-not-found'){
                    errMessage = 'The email address that you\'ve entered doesn\'t match any account.';
                }
                if(err.code === 'auth/wrong-password'){
                    errMessage = 'The password you\'ve entered is incorrect.';
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

// Upload the user image
export const startUploadUserImage = (imgFile: File) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                const uid = getState().userAuth.user?.uid;
    
                // Storing image in firebase storage
                // img pathway uid/user-img/img
                const storageRef = storage.ref(uid); // creating a user folder with uid
                const fileRef = storageRef.child('/user-img/' + imgFile); // creating a user-img/imgfile folder
                const uploadTask = await fileRef.put(imgFile); // putting the img file in the respective folder

                const downloadUrl = await uploadTask.ref.getDownloadURL();

                // update the firestore with the user img url
                await db.collection('users').doc(uid).set({
                    userImg: downloadUrl
                },{ merge: true });

                // Update the redux store with the user img url
                const user = getState().userAuth.user;

                const updatedUser = { ...user, userImg: downloadUrl } as User;

                dispatch(storeAuthUser(updatedUser));
                
                // Show snackbar for successfull upload
                dispatch(showSnackbar({
                    open: true,
                    message: 'Image uploaded successfully ',
                    color: 'success',
                }));

                resolve();

            }catch(err) {
                dispatch(showSnackbar({
                    open: true,
                    message: 'Something went wrong',
                    color: 'error',
                }));
                console.log(err);
                reject(err);
            }
        });
    };
};

