import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from 'store/reducers';
import { ThunkDispatch } from 'redux-thunk';
import { startFetchAShow, startToggleWishlist } from 'store/actions/shows';
import { AppActions } from 'store/actions/types';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { dateParser } from '../utils/helperFunctions';
import { User } from 'store/types';

// @ts-ignore
import Tilt from 'react-tilt'; 
import { BookmarkBorder as BookmarkBorderIcon, Bookmark as BookmarkIcon } from '@material-ui/icons';
import { Container, Grid, makeStyles, Typography, Box, CircularProgress } from '@material-ui/core';
import CircularLoader from 'components/partials/CircularLoader';
import noShowImg from '../assets/show.png';

type OwnProps = {};
type Props = OwnProps & StoreDispatchToProps & StoreStateToProps & RouteComponentProps;

const useStyles = makeStyles(theme => ({
    showContainer: {
     display: 'flex',
     alignItems:'center',
     minHeight: '100vh',
     backgroundSize: 'cover !important',
     backgroundRepeat: 'no-repeat !important',
     backgroundPosition: 'top !important',
     [theme.breakpoints.down('sm')]: {
        padding: '80px 0',
     }
    },
    showContent: {
        color: '#fff',
        display:'flex',
        flexDirection: 'column',
        justifyContent:'space-around',
        height: '60%',
        [theme.breakpoints.down('md')]: {
            marginBottom: 50,
        }
    },
    showDetail: {
        fontWeight: 600,
    },
    bookmark: { 
        display:'inline-flex',
        alignItems: 'center',
        cursor:'pointer',
        position: 'relative',
        '&::after': {
            content: '""',
            position:'absolute',
            width:94.65,
            height: '100%',
            opacity:0,
            paddingBottom: 3,
            transition: 'all .2s',
            borderBottom: '1px solid',
        },
        '&:hover::after': {
            opacity: 1,
        }
    }
 }));
 

const Show: React.FC<Props> = (props) => {
    const [showData, setShowData] = useState<{[key: string]: any} | null>(null);
    const [categoryRef, setCategoryRef] = useState<"tv" | "movie">("movie");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [togglingWishlist, setTogglingWishlist] = useState<boolean>(false);
    const [itemAdded, setItemAdded] = useState<boolean>(false);

    const { showContainer, showContent, bookmark } = useStyles();

    const imgBaseUrl = 'http://image.tmdb.org/t/p/w1280';

    const options = {
        max: 25,     // max tilt rotation (degrees)
        perspective: 1000,   // Transform perspective, the lower the more extreme the tilt gets.
        scale: 1.01,      // 2 = 200%, 1.5 = 150%, etc..
        speed: 400,    // Speed of the enter/exit transition
        transition: true,   // Set a transition on enter/exit.
        axis: null,   // What axis should be disabled. Can be X or Y.
        reset: true,    // If the tilt effect has to be reset on exit.
        easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
    };

    useEffect(() => {
        // Get the show name from the query param
        const queryParams = new URLSearchParams(props.location.search);
        const sName = queryParams.get('sname') as string;
        let category = queryParams.get('category');

        if(category === 'movies' || category === 'movie') {
            category = 'movie';
        } else {
            category ='tv';
        }
        
        // Just to use category to check the card and render the different property api ( series, movies)
        setCategoryRef(category as "movie" | "tv");
        
        // Fetch the show data
        props.fetchAShow(sName, category as 'movie' | 'tv')
        .then(response => {
            setShowData(response);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        // When page loads ( using it here because it seems that startFetchUserData runs after fetchAShow)
        const showId = showData?.id;
        // Check if the movie is in wishlist already (wishlist[movie | series])
        const isBookmarked = props.user?.wishlist[categoryRef].includes(showId);
        if(isBookmarked){
            setItemAdded(true);
        }
    },[showData, props.user]);

    const addToWishlistHandler = () => {
        setTogglingWishlist(true);
        props.toggleWishlist(showData?.id, categoryRef, 'add').then(() => {
            setItemAdded(true);
            setTogglingWishlist(false);
        })
        .catch(err => {
            setTogglingWishlist(false);
        });
    };

    const removeFromWishlistHandler = () => {
        setTogglingWishlist(true);
        props.toggleWishlist(showData?.id, categoryRef, 'remove').then(() => {
            setItemAdded(false);
            setTogglingWishlist(false);
        });
    };

    const renderBookmark = () => {
        if(!itemAdded){
            return (
                <Typography 
                  className={bookmark}
                  onClick={addToWishlistHandler}
                  variant="body2"
                >
                    <BookmarkBorderIcon fontSize="small"
                      style={{ marginRight: 6, marginLeft: -3 }}
                    /> 
                    Bookmark
                </Typography>
            );
        } else {
            return (
                <Typography 
                  className={bookmark}
                  onClick={removeFromWishlistHandler}
                  variant="body2"
                >
                    <BookmarkIcon fontSize="small"
                      style={{ marginRight: 6, marginLeft: -3 }}
                    /> 
                    Bookmark
                </Typography>
            );
        }
    };


    if(isLoading){
        return (
            <CircularLoader fullHeight/>
        );
    }

    return (
        <section 
          className={showContainer}
          style={{ background: showData?.backdrop_path &&
            `linear-gradient(to top, rgba(0, 0, 0, .7) 40%, rgba(0, 0, 0, 0.4)), url('${imgBaseUrl + showData.backdrop_path}')`
         }}
        >
            <Container
              style={{ height: '100%' }}
            >
                <Grid container
                  style={{ height: '100%' }}   
                >
                    <Grid item
                      xs={12}
                      md={6}
                      style={{ minHeight: '100%', display:'flex', alignItems: 'center' }}
                    >
                        <Box className={showContent}>
                            <Box style={{ marginBottom: 30 }}>
                                <Typography variant="body2">{categoryRef === 'movie' ? (<React.Fragment>{dateParser(showData?.release_date)}</React.Fragment>) :
                                (<React.Fragment>{dateParser(showData?.first_air_date)}</React.Fragment>)}
                                </Typography>
                                <Typography variant="body2">
                                    { showData?.vote_average } / 10
                                </Typography>   
                            </Box>
                            <Box>
                                <Typography variant="h4"
                                  style={{ marginBottom: 15, fontWeight: 'bold' }}
                                >
                                    {categoryRef === 'movie' ? showData?.title : showData?.name}
                                </Typography>
                                <Typography variant="body1"
                                  style={{ lineHeight: 1.7 }}
                                >
                                    {showData?.overview}
                                </Typography>
                            </Box>
                            <Box style={{ display:'flex', alignItems: 'center', marginTop:30 }}>
                                { renderBookmark() }
                                {togglingWishlist ? <CircularProgress size={10}
                                  style={{ color:'#fff', marginLeft:10 }}
                                /> : null }
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item
                      xs={12}
                      md={6}
                      style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent:'center' }}

                    >
                        <Box>
                            <Tilt options={options}>
                                {showData?.poster_path ? (
                                    <img src={`http://image.tmdb.org/t/p/w342/${showData?.poster_path}`}
                                      alt=""
                                    />
                                ) : (
                                    <img src={noShowImg}
                                      style={{ maxWidth: 400 }}
                                      alt=""
                                    />
                                )}
                            </Tilt>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
};

type StoreDispatchToProps = {
    fetchAShow: (sName: string, category: 'tv' | 'movie') => Promise<{[key: string]: any}>;
    toggleWishlist: (sid: string, category: 'tv' | 'movie', ToggleAction: "add" | "remove") => Promise<unknown>;
}

type StoreStateToProps = {
    user: User;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, props: OwnProps): StoreDispatchToProps => ({
    fetchAShow: (sName, category) => dispatch(startFetchAShow(sName, category)),
    toggleWishlist: (sid, category, toggleAction) => dispatch(startToggleWishlist(sid, category, toggleAction))
});

const mapStateToProps = (state: AppState): StoreStateToProps => ({
    user: state.userAuth.user
});

export default withRouter(connect<StoreStateToProps, StoreDispatchToProps, OwnProps, AppState>(mapStateToProps, mapDispatchToProps)(Show));