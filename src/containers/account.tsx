import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { storeAuthUser, startUploadUserImage } from 'store/actions/userAuth';
import { startFetchWishlistShows } from 'store/actions/shows';
import { User } from 'store/types';
import { AppActions } from 'store/actions/types';
import { AppState } from 'store/reducers';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { v4 as uuid } from 'uuid';

import TopBar from 'components/partials/TopBar';

import { Container, Grid, makeStyles, Typography, Tabs, Tab, Paper, Box, Button, CircularProgress } from '@material-ui/core';
import { Bookmark as BookmarkIcon, Person as PersonIcon, ExitToApp as ExitToAppIcon, PhotoCamera as PhotoCameraIcon, VpnKey as VpnKeyIcon } from '@material-ui/icons';
import ShowsCard from 'components/partials/ShowsCard';
import CircularLoader from 'components/partials/CircularLoader';

import wishlistImg from 'assets/svgs/wishlist.svg';
import noShowImg from 'assets/show.png';
import noImg from 'assets/no-img.png';


type OwnProps = {};

type Props = OwnProps & RouteComponentProps & StoreDispatchProps & StoreStateProps;

const useStyles = makeStyles(theme => ({
    account: {
        color: '#fff',
        marginBottom: 160,
    },
    accountCard: {
        padding: '30px 10px 40px 10px',
        minWidth: 200,
        color: '#fff',
        background: theme.palette.secondary.main,
        marginBottom: 30,
        '& .MuiTab-labelIcon': {
            paddingLeft: 20,
            paddingRight: 20,
            textTransform: 'capitalize',
            marginTop: 10,
            minHeight: 40,
            minWidth: '100%',
            
            '&.Mui-selected': {
                background: 'rgba(0,0,0,.1)',
            }
        },
        '& .MuiTabs-indicator': {
            background: theme.palette.primary.main,
            width: 3,
        }
    },
    tabIcon: {
        marginRight: 10,
        marginBottom:'4px !important',
    },
    tabContent: {
        background: theme.palette.secondary.main,
        minHeight: 520,
        marginRight: 'auto',
        marginLeft: 60,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        }
    },
    tabContentTitle: {
        marginBottom: 35,
        position: 'relative',
        display:'inline-block',
        '&::after': {
            content: '""',
            position:'absolute',
            width:'100%',
            height: '100%',
            opacity:1,
            left: 0,
            top: 2,
            paddingBottom: 3,
            transition: 'all .2s',
            borderBottom: '1px solid',
        },
    },
    wishlistGrid: {
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center',
        }
    },
    wishlistShow: {
        marginBottom: 43,
        '&:not(:last-child)': {
            marginRight: 11,
        }
    },
    changeFnGrid: {
        borderLeft: '1px solid #fff',
        paddingLeft: 60,
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    imgBox: {
        marginBottom: 20, 
        background: 'rgba(0,0,0,.1)', 
        width: 150, 
        height: 150,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

const Account: React.FC<Props> = (props) => {
    const { account, accountCard, tabIcon, tabContent, tabContentTitle, wishlistShow, wishlistGrid, changeFnGrid, imgBox } = useStyles();
    
    const [tabIdx, setTabIdx] = useState(0);
    const [wishlistShows, setWishlistShows] = useState<Array<{[key: string]: any}> | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

    const inputFileElRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setIsLoading(true);
        props.fetchWishlistShows()
        .then(res => {
            setWishlistShows(res);
            setIsLoading(false);
            console.log(res);
        });
    }, [props.user?.wishlist]);

    // Handlers 
    const onTabChangeHandler = (event: React.ChangeEvent<{}>, idx: any) => {
        // If logout tab is clicked
        if(idx === 2){
            firebase.auth().signOut().
            then(() => {
              props.storeAuthUser(null);
              // Redirect to login page
              props.history.push('/login');
            });
        }
        else 
        setTabIdx(idx);
    };

    // Upload the image
    const uploadImgHandler = () => {
       if(!inputFileElRef.current?.files) return;

       const img = inputFileElRef.current?.files[0];

       setIsUploading(true);

       props.uploadUserImg(img).then(() => {
        setIsUploading(false);
       })
       .catch(() => {
        setIsUploading(false);
       });
    };

    const wishlistItemsLength =  () => {
        if(props.user){
          const length = props.user?.wishlist.movie.length + props.user?.wishlist.tv.length;
          return length;
        }
      };

    // Html rendering
    const renderTabsContent = () => {
        if(tabIdx === 0){
            return (
                <Box p={5}>
                    <Typography variant="h6"
                      className={tabContentTitle}
                    >
                        Wishlist
                    </Typography>
                    { isLoading ? (
                        <CircularLoader />
                    ) : (
                        <Grid container
                          className={wishlistGrid}
                        >
                            { (wishlistShows?.length !== 0) ? wishlistShows?.map(s => (
                                <Grid item
                                  key={uuid()}
                                  className={wishlistShow}
                                >
                                    <ShowsCard
                                      width={200}
                                      height={300}
                                      cardTitle={s.title}
                                      imgUrl={!s.poster_path ? noShowImg : 'http://image.tmdb.org/t/p/w342/' + s.poster_path}
                                      link={`/show?sname=${s.title.toLowerCase()}&category=${s.category.toLowerCase()}`}
                                    />
                                </Grid>
                            )) : (
                                <Grid item
                                  xs={12}
                                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                >
                                    
                                    <img src={wishlistImg}
                                      style={{ maxWidth: 350 }}
                                    />
                                    <Typography align="center">Bookmark a show to have them on your wishlist.
                                        <br />
                                        <Link 
                                          style={{ textDecoration: 'none', color: 'rgb(22,85,190)' }}
                                          to="/"
                                        >Bookmark now ?</Link>
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                    )}
                </Box>
            );
        } else if(tabIdx === 1){
            return (
                <Box p={5}>
                    <Typography variant="h6"
                      className={tabContentTitle}
                    >
                        Profile
                    </Typography>
                    <Grid container>
                        <Grid item
                          xs={12}
                          sm={6}
                        >
                            <Box className={imgBox}>
                                {isUploading ? (
                                    <CircularProgress size={25}
                                      style={{ color:'#fff', display: isUploading ? 'block' : 'none' }}
                                    />
                                ) : (
                                    <img 
                                      style={{ width: '100%', height: '100%', objectFit:'cover', objectPosition: 'top' }}
                                      src={props.user?.userImg ? props.user.userImg : noImg}
                                    ></img>
                                )}
                            </Box>
                            <Typography variant="h6"
                              style={{ fontWeight: 600, marginBottom:15 }}
                            >
                                {props.user?.name}
                            </Typography>
                            <Typography variant="body1">
                                <strong style={{ fontWeight: 600 }}>Email</strong>: {props.user?.userEmail}
                            </Typography>
                            <Typography variant="body1">
                                <strong style={{ fontWeight: 600 }}>Wishlist items</strong>: {wishlistItemsLength()}
                            </Typography>
                        </Grid>
                        <Grid item
                          xs={12}
                          sm={6}
                          className={changeFnGrid}
                        >
                            <Box style={{ marginBottom: 40 }}>
                                <span style={{ display: 'inline-block', marginBottom: 15 }}>Would you like to upload a profile photo ?</span>
                                <input
                                  ref={inputFileElRef}
                                  onChange={uploadImgHandler}
                                  accept="image/*"
                                  id="contained-button-file"
                                  type="file"
                                  style={{ display:'none' }}
                                  
                                />
                                <label htmlFor="contained-button-file">
                                    <Button 
                                      variant="contained"
                                      color="primary"
                                      size="small"
                                      component="span"
                                      startIcon={<PhotoCameraIcon />}
                                    >
                                        Upload
                                    </Button>
                                    {/* {isUploading ? <CircularProgress size={10}
                                      style={{ color:'#fff', marginLeft:10 }}
                                    /> : null } */}
                                </label>
                            </Box>
                            <Box>
                                <span style={{ display: 'inline-block', marginBottom: 15 }}>Do you want to change your password ?</span>
                                <Button variant="contained"
                                  color="primary"
                                  component="span"
                                  size="small"
                                  startIcon={<VpnKeyIcon />}
                                >
                                    Change password
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            );
        }
    };

    return (
        <section className={account}>
            <TopBar text="Account" />
            <Container>
                <Grid container
                  spacing={0}
                  justify="space-between"
                >
                    <Grid item
                      xs={12}
                      md={2}
                    >
                        <Paper className={accountCard}>
                            <Typography align="left"
                              style={{ fontSize: 20, fontWeight: 500, marginBottom: 20, left:23, position:'relative' }}
                            >
                                My Account
                            </Typography>
                            <Tabs
                              onChange={onTabChangeHandler}
                              orientation="vertical"
                              value={tabIdx}
                            >
                                <Tab
                                  label="Wishlist"
                                  icon={<BookmarkIcon fontSize="small"
                                    className={tabIcon}
                                  />}
                                />
                                <Tab label="Profile"
                                  icon={<PersonIcon
                                    fontSize="small"
                                    // style={{ marginLeft:-33 }}
                                    className={tabIcon}
                                  />}
                                />
                                <Tab label="Logout"
                                //   style={{ marginLeft:-33 }}
                                  icon={<ExitToAppIcon fontSize="small"
                                    className={tabIcon}
                                  />}
                                />
                            </Tabs>
                        </Paper>
                    </Grid>
                    <Grid item
                      xs={12}
                      md={9}
                      className={tabContent}
                    >
                        {renderTabsContent()}
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
};

type StoreStateProps = {
    user: User;
}

type StoreDispatchProps = {
    storeAuthUser: (user: User) => void;
    fetchWishlistShows: () => Promise<Array<{[key: string]: any}>>;
    uploadUserImg: (imgFile: File) => Promise<void>;
}

const mapStateToProps = (state: AppState): StoreStateProps => ({
    user: state.userAuth.user
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): StoreDispatchProps => ({
    storeAuthUser: (user) => dispatch(storeAuthUser(user)),
    fetchWishlistShows: () => dispatch(startFetchWishlistShows()),
    uploadUserImg: (imgFile) => dispatch(startUploadUserImage(imgFile))
});


export default withRouter(connect<StoreStateProps, StoreDispatchProps, OwnProps, AppState>(mapStateToProps, mapDispatchToProps)(Account));