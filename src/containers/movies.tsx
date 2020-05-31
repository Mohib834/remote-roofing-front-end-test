import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreator from '../store/actions/movies';
import { AppState } from '../store/reducers';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../store/actions/types';
import { RouteComponentProps } from 'react-router-dom';
import { v4 as uuid } from 'uuid';


import { Container, Grid } from '@material-ui/core';

import ShowsCard from '../components/partials/ShowsCard';
import TopBar from '../components/partials/TopBar';
import SkeletonLoader from '../components/partials/SkeletonLoader';
import SearchBar from '../components/partials/SearchBar';


// Props and state of the component
type OwnProps = {}
type MoviesStates = {}

type Props = OwnProps & StoreDispatchProps & StoreStateProps & { routeProps: RouteComponentProps<{}>}

const Movies: React.FC<Props> = (props) => {
    const { fetchShows, isLoading  } = props;
    
    const [movies, setMovies] = useState<Array<{[key: string]: any}> | null>(null);
    
    // On page mount
    useEffect(() => {
        // Call the dispatch action
        fetchShows('movies').then(response => {
            setMovies(response);
        });
    }, []); 

    const searchShowsHandler = (value: string) => {
        // Get the searched text from the child
        const searchText = value;
        // Filter the shows according to the searched text;

    }; 

    if(isLoading) return (
        <React.Fragment>
            <TopBar text="Movies" />
            <SkeletonLoader />
        </React.Fragment>
    );
    
    return (
        <section>
            <TopBar text="Movies" />
            <Container>
                <SearchBar 
                  searchShows={searchShowsHandler}
                  placeholder="Search Movies"
                />
                <Grid 
                  container
                  spacing={4}
                >
                    {movies?.map(m => (
                        <Grid item
                          xs={2}
                          key={uuid()}
                          style={{ marginRight: 40, marginBottom: 40 }}
                        >
                            <ShowsCard    
                              cardTitle={m.title}
                              link="/movies"
                              routeProps={props.routeProps}
                              imgUrl={m.images["Poster Art"].url}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </section>
    );
};

// Props type of the action and state
type StoreStateProps = {
     isLoading: boolean;
}

type StoreDispatchProps = {
    fetchShows: (category: string) => Promise<Array<{}>>;
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StoreStateProps => ({
    isLoading: state.shows.isLoading,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProps: OwnProps): StoreDispatchProps => ({
    fetchShows: (category: string) => dispatch(actionCreator.startFetchShowsData(category)),
});
    

export default connect<StoreStateProps, StoreDispatchProps, OwnProps, AppState>(mapStateToProps, mapDispatchToProps)(Movies);