import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from 'store/reducers';
import { ThunkDispatch } from 'redux-thunk';
import { startFetchAShow } from 'store/actions/shows';
import { AppActions } from 'store/actions/types';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { dateParser } from '../utils/helperFunctions';

// @ts-ignore
import Tilt from 'react-tilt'; 
import { BookmarkBorder as BookmarkBorderIcon, Bookmark as BookmarkIcon } from '@material-ui/icons';
import { Container, Grid, makeStyles, Typography, Box } from '@material-ui/core';
import Ratings from '../components/partials/Ratings';

type OwnProps = {};
type Props = OwnProps & StoreDispatchProps & RouteComponentProps;

const useStyles = makeStyles(theme => ({
    showContainer: {
     height: '100vh',
     backgroundSize: 'cover !important',
     backgroundRepeat: 'no-repeat !important',
    },
    showContent: {
        color: '#fff',
        display:'flex',
        flexDirection: 'column',
        justifyContent:'space-around',
        height: '60%'
    },
    showDetail: {
        fontWeight: 600,
    }
 }));
 

const Show: React.FC<Props> = (props) => {
    const [showData, setShowData] = useState<{[key: string]: any} | null>(null);
    const [categoryRef, setCategoryRef] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { showContainer, showContent, showDetail } = useStyles();

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

        if(category === 'movies') {
            category = 'movie';
        } else {
            category ='tv';
        }
        
        // Just to use category to check the card and render the different property api ( series, movies)
        setCategoryRef(category);

        // Fetch the show data
        props.fetchAShow(sName, category as 'movie' | 'tv')
        .then(response => {
            setShowData(response);
            setIsLoading(false);
        });
    }, []);


    if(isLoading){
        return (
            <React.Fragment>
                Loading...
            </React.Fragment>
        );
    }

    return (
        <section 
          className={showContainer}
          style={{ background: `linear-gradient(to top, rgba(0, 0, 0, .7) 40%, rgba(0, 0, 0, 0.4)), url('${imgBaseUrl + showData?.backdrop_path}')` }}
        >
            <Container
              style={{ height: '100%' }}
            >
                <Grid container
                  style={{ height: '100%' }}   
                >
                    <Grid item
                      xs={6}
                      style={{ height: '100%', display:'flex',alignItems:'center' }}
                    >
                        <Box className={showContent}>
                            <Box>
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
                            <Box>
                                <Typography style={{ display:'flex', alignItems: 'center' }}
                                  variant="body2"
                                >
                                    <BookmarkBorderIcon fontSize="small"
                                      style={{ marginRight: 6, marginLeft: -3 }}
                                    /> Watch Later 
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item
                      xs={6}
                      style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent:'center' }}

                    >
                        <Box>
                            <Tilt options={options}>
                                <img src={`http://image.tmdb.org/t/p/w342/${showData?.poster_path}`}
                                  alt=""
                                />
                            </Tilt>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
};

type StoreDispatchProps = {
    fetchAShow: (sName: string, category: 'tv' | 'movie') => Promise<{[key: string]: any}>;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, props: OwnProps): StoreDispatchProps => ({
    fetchAShow: (sName, category) => dispatch(startFetchAShow(sName, category)),
});

export default withRouter(connect<{}, StoreDispatchProps, OwnProps, AppState>(null, mapDispatchToProps)(Show));