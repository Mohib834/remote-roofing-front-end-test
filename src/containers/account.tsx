import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { storeAuthUser } from 'store/actions/userAuth';
import { startFetchWishlistShows } from 'store/actions/shows';
import { User } from 'store/types';
import { AppActions } from 'store/actions/types';
import { AppState } from 'store/reducers';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { v4 as uuid } from 'uuid';

import TopBar from 'components/partials/TopBar';

import { Container, Grid, makeStyles, Typography, Tabs, Tab, Paper, Box } from '@material-ui/core';
import { Bookmark as BookmarkIcon, Person as PersonIcon, ExitToApp as ExitToAppIcon, UsbOutlined } from '@material-ui/icons';
import ShowsCard from 'components/partials/ShowsCard';
import CircularLoader from 'components/partials/CircularLoader';


type OwnProps = {};

type Props = OwnProps & RouteComponentProps & StoreDispatchProps & StoreStateProps;

const useStyles = makeStyles(theme => ({
    account: {
        color: '#fff',
        marginBottom: 160,
    },
    accountCard: {
        padding: '30px 10px 40px 10px',
        width: 200,
        color: '#fff',
        background: theme.palette.secondary.main,
        '& .MuiTab-labelIcon': {
            paddingLeft: 20,
            paddingRight: 20,
            textTransform: 'capitalize',
            marginTop: 10,
            minHeight: 40,
            
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
        minHeight: 520
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
    wishlistShow: {
        marginBottom: 43,
        '&:not(:last-child)': {
            marginRight: 11,
        }
    }
}));

const Account: React.FC<Props> = (props) => {
    const { account, accountCard, tabIcon, tabContent, tabContentTitle, wishlistShow } = useStyles();
    
    const [tabIdx, setTabIdx] = useState(0);
    const [wishlistShows, setWishlistShows] = useState<Array<{[key: string]: any}> | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        props.startFetchWishlistShows()
        .then(res => {
            console.log(res);
            setWishlistShows(res);
            setIsLoading(false);
        });
    }, [props.user?.wishlist]);

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
                        <Grid container>
                            {wishlistShows?.map(s => (
                                <Grid item
                                  key={uuid()}
                                  className={wishlistShow}
                                >
                                    <ShowsCard
                                      width={200}
                                      height={300}
                                      cardTitle={s.title}
                                      imgUrl={'http://image.tmdb.org/t/p/w342/' + s.poster_path}
                                      link={`/show?sname=${s.title.toLowerCase()}&category=${s.category.toLowerCase()}`}
                                    />
                                </Grid>
                            ))}
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
                      xs={2}
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
                      xs={9}
                      className={tabContent}
                      style={{ marginRight: 'auto', marginLeft: 60 }}
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
    startFetchWishlistShows: () => Promise<Array<{[key: string]: any}>>;
}

const mapStateToProps = (state: AppState): StoreStateProps => ({
    user: state.userAuth.user
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): StoreDispatchProps => ({
    storeAuthUser: (user) => dispatch(storeAuthUser(user)),
    startFetchWishlistShows: () => dispatch(startFetchWishlistShows())
});


export default withRouter(connect<StoreStateProps, StoreDispatchProps, OwnProps, AppState>(mapStateToProps, mapDispatchToProps)(Account));