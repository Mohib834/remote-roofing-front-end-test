import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from 'store/reducers';
import { ThunkDispatch } from 'redux-thunk';
import { startFetchAShow } from 'store/actions/shows';
import { AppActions } from 'store/actions/types';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Container, Grid, makeStyles, Box, Typography, CircularProgress } from '@material-ui/core';

import Ratings from '../components/partials/Ratings';

type OwnProps = {};
type Props = OwnProps & StoreStateProps & StoreDispatchProps & RouteComponentProps

const useStyles = makeStyles({
   posterContainer: {
    width: '100vw',
    height: '78vh',
    position:'relative',
    left: '50%',
    transform:'translateX(-50%)',
    backgroundSize: 'cover',
    backgroundPosition: 'top',
   },
});


const Show: React.FC<Props> = (props) => {
    const [showData, setShowData] = useState<{[key: string]: any} | null>(null);
    const { posterContainer } = useStyles();

    const imgBaseUrl = 'http://image.tmdb.org/t/p/w1280';

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

        // Fetch the show data
        props.fetchAShow(sName, category as 'movie' | 'tv')
        .then(response => {
            setShowData(response);
        });
    }, []);

    if(props.isLoading){
        return (
            <React.Fragment>
                {/* query param */}
                Loading...
            </React.Fragment>
        );
    }

    return (
        <Container style={{ marginBottom: 120 }}>
            <Grid container>
                <Grid item
                  xs={12}
                  style={{ marginBottom: 30 }}
                >
                    <Box className={posterContainer}
                      style={{ backgroundImage: `url(${imgBaseUrl + showData?.backdrop_path})` }}
                    >
                    </Box>
                </Grid>
                <Grid item
                  xs={12}
                >
                    <Grid container
                      style={{ minHeight: 400 }}
                    >
                        <Grid item
                          xs={8}
                        >
                            <Typography variant="h4"
                              style={{ fontWeight: 500, marginBottom: 10 }}
                            >
                                {showData?.title}
                            </Typography>
                            <Typography variant="body1"
                              style={{ position:'relative', left: 2 }}
                            >
                                <strong>Released At</strong>: {showData?.release_date}
                            </Typography>
                            <Typography variant="body1"
                              style={{ position:'relative', width: '90%', left: 2, lineHeight:1.7 }}
                            >
                                <strong>Overview</strong>: {showData?.overview}
                            </Typography>
                        </Grid>
                        <Grid item
                          xs={4}
                          style={{ borderLeft: '1px solid rgba(0,0,0,.1)', paddingLeft: 30 }}
                        >
                            <Typography variant="h5"
                              style={{ marginBottom: 20 }}
                            >
                                Likes &amp; Ratings
                            </Typography>
                            <Box>
                                <Ratings
                                  value={showData?.vote_average}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

type StoreStateProps = {
    isLoading: boolean;
}
type StoreDispatchProps = {
    fetchAShow: (sName: string, category: 'tv' | 'movie') => Promise<{[key: string]: any}>;
}

const mapStateToProps = (state: AppState, props: OwnProps): StoreStateProps => ({
    isLoading: state.shows.isLoading,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, props: OwnProps): StoreDispatchProps => ({
    fetchAShow: (sName, category) => dispatch(startFetchAShow(sName, category)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Show));