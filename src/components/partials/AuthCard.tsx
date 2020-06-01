import React, { useState } from 'react';
import { makeStyles, Card, CardContent, Typography, TextField, Grid, Button, CircularProgress } from '@material-ui/core';
import TheatersIcon from '@material-ui/icons/Theaters';
import { connect } from 'react-redux';
import { AppState } from 'store/reducers';
import { RouteComponentProps, withRouter } from 'react-router-dom';

type OwnProps = {
    authFunction: (email: string, password: string) => Promise<unknown>;
}

type Props = OwnProps & StoreStateProps & RouteComponentProps

const useStyles = makeStyles(theme => ({
    authCard: {
        background:theme.palette.primary.main,
        color: '#fff',
        width: 400,
        minHeight: 410,
        boxSizing: 'border-box',
        padding: '15px 20px',
        paddingTop: 5,
    },
}));

const AuthCard: React.FC<Props> = (props) => {
    const { authCard } = useStyles();

    const [inputDisable, setInputDisable] = useState(false);

    // Inputs states
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    // Validations
    const [emailErr, setEmailErr] = useState({
        error: false,
        message: '',
    });
    const [usernameErr, setUsernameErr] = useState({
        error: false,
        message: '',
    });
    const [passwordErr, setPasswordErr] = useState({
        error: false,
        message: '',
    });

    const [step, setStep] = useState(1);

    const checkEmail = () => {
        // Email regex
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        // Email Rules
        // If user clicks next without the email field.
        if(email.length === 0){
            setEmailErr({
                error: true,
                message: 'Email cannot be left empty !'
            });
            return;
        } 
        // If invalid email
        if(!pattern.test(email)){
            setEmailErr({
                error: true,
                message: 'Please Enter a valid email !'
            });
            return;
        }
        // If everything is good
        setEmailErr({
            error: false,
            message: '',
        });

        setStep(2);
    };

    const onSubmitForm = () => {
        // Validate username and password
        if(username.length === 0 && password.length === 0){
            setUsernameErr({
                error: true,
                message: 'Username cannot be left Empty !'
            });
            setPasswordErr({
                error: true,
                message: 'Password cannot be left Empty!'
            });
            return; 
        }

        if(password.length <= 6){
            setPasswordErr({
                error: true,
                message: 'Password should have min 6 characters'
            });
            return;
        }

        setUsernameErr({
            error: false,
            message: '',
        });
        setPasswordErr({
            error: false,
            message: '',
        });
        // Submit form and disable text fields
        setInputDisable(true);
        // Dispatch event to trigger authentication
        props.authFunction(email, password).then(() => {
            props.history.push('/');
        });
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        if(type === 'email'){
            setEmail(e.target.value);
        }
        if(type === 'username'){
            setUsername(e.target.value);
        }
        if(type === 'password'){
            setPassword(e.target.value);
        }
    };
    // Rendering form according to the step
    const renderStep = () => {
        if(step === 1){
            return (
                <React.Fragment>
                    <label htmlFor="email-input"
                      style={{ textAlign:'left' }}
                    >Email</label>
                    <TextField id="email-input"
                      variant="outlined"
                      margin="dense"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeHandler(e, 'email')}
                      value={email}
                      placeholder="Your email"
                      className="input-field"
                      error={emailErr.error}
                      helperText={emailErr.message}
                      disabled={inputDisable}
                      style={{ marginBottom: 20 }}
                    />
                    <Button 
                      variant="contained"
                      color="secondary"
                      fullWidth={true}
                      onClick={checkEmail}
                      style={{ marginBottom: 30, fontWeight: 400 }}
                    >
                        Next
                    </Button>
                </React.Fragment>

            );
        }
        if(step === 2){
            return (
                <React.Fragment>
                    <label htmlFor="email-input"
                      style={{ textAlign:'left' }}
                    >User Name</label>
                    <TextField id="userName-input"
                      variant="outlined"
                      margin="dense"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeHandler(e, 'username')}
                      value={username}
                      placeholder="Your username"
                      className="input-field"
                      error={usernameErr.error}
                      helperText={usernameErr.message}
                      disabled={inputDisable}
                      style={{ marginBottom: 20, background: inputDisable ? 'rgba(255,255,255,.5)' : '' }}
                    />
                    <TextField id="userName-input"
                      variant="outlined"
                      margin="dense"
                      type="password"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeHandler(e, 'password')}
                      value={password}
                      placeholder="Your password"
                      className="input-field"
                      error={passwordErr.error}
                      helperText={passwordErr.message}
                      disabled={inputDisable}
                      style={{ marginBottom: 20, background: inputDisable ? 'rgba(255,255,255,.5)' : '' }}

                    />
                    <Button 
                    
                      variant="contained"
                      color="secondary"
                      fullWidth={true}
                      onClick={onSubmitForm}
                      style={{ marginBottom: 30, fontWeight: 400 }}
                    >
                        { props.isLoading ? (
                            <CircularProgress style={{ paddingTop:1.2, paddingBottom: 1.2 }}
                              size={25}
                            />
                        ): 'Submit'}
                    </Button>
                </React.Fragment>
            );
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Card className={authCard}>
                <CardContent style={{ textAlign:'center' }}>
                    <Grid container>
                        <Grid item
                          xs={12}
                          style={{ marginBottom: 30 }}
                        >
                            <TheatersIcon style={{ fontSize:56 }} />
                            <Typography style={{ fontSize: 24, textTransform:'uppercase', fontWeight:500 }}>
                                Demo streaming
                            </Typography>
                        </Grid>
                        <Grid item
                          xs={12}
                          style={{ display:'flex' }}
                          direction="column"
                        >
                            { renderStep() }
                        </Grid>
                        <Grid
                          item
                          xs={12}
                        >
                            <Typography style={{ fontSize:12 }}>
                                By clicking the {step === 1 ? '"Next"' : '"Submit"'} button, you consent to the use of cookies and similar technologies and instruct us to share information as described in our Privacy Policy.
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </form>
    );
};

type StoreStateProps = {
    isLoading: boolean;
}

const mapStateToProps = (state: AppState): StoreStateProps => ({
    isLoading: state.userAuth.isLoading
});

export default withRouter(connect<StoreStateProps, {}, OwnProps, AppState>(mapStateToProps)(AuthCard));