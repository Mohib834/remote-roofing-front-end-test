import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../store/reducers';
import { ThunkDispatch } from 'redux-thunk';
import * as actionCreator from '../store/actions/movies';
import { RouteComponentProps } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { AppActions } from '../store/actions/types';

import { Container, Grid } from '@material-ui/core';

import TopBar from '../components/partials/TopBar';
import ShowsCard from '../components/partials/ShowsCard';
import SkeletonLoader from '../components/partials/SkeletonLoader';
import SearchBar from '../components/partials/SearchBar';

type OwnProps = {};
type SeriesStates = {}

type Props = OwnProps & StoreDispatchProps & StoreStateProps & { routeProps: RouteComponentProps<{}>}

const Series: React.FC<Props> = (props) => {
    const { fetchShows, isLoading } = props;

    const [series, setSeries] = useState<Array<{[key: string]: any}> | null>(null);

    useEffect(() => {
        // Call the dispatch action
        fetchShows('series').then(response => {
            setSeries(response);
        });
    }, []);

    if(isLoading) return (
        <React.Fragment>
            <TopBar text="Series" />
            <SkeletonLoader />
        </React.Fragment>
    );


    return (
        <section>
            <TopBar text="Series" />
            <Container>
                {/* <SearchBar placeholder="Search Series" /> */}
                <Grid 
                  container
                  spacing={4}
                >
                    {series?.map(s => (
                        <Grid item
                          xs={2}
                          key={uuid()}
                          style={{ marginRight: 40, marginBottom: 40 }}
                        >
                            <ShowsCard    
                              cardTitle={s.title}
                              link="/movies"
                              imgUrl={s.images["Poster Art"].url}
                              routeProps={props.routeProps}
                            />
                        </Grid>
                ))}
                </Grid>
            </Container>
        </section>
    );
};

type StoreStateProps = {
    isLoading: boolean;
}

type StoreDispatchProps = {
    fetchShows: (category: string) => Promise<Array<{[key: string]: any}>>;
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StoreStateProps => ({
    isLoading: state.shows.isLoading,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProps: OwnProps): StoreDispatchProps => ({
    fetchShows: (category: string) => dispatch(actionCreator.startFetchShowsData(category))
});


export default connect<StoreStateProps, StoreDispatchProps, OwnProps, AppState>(mapStateToProps, mapDispatchToProps)(Series);