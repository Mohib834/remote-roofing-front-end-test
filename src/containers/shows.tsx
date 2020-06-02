import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../store/reducers';
import { ThunkDispatch } from 'redux-thunk';
import * as actionCreator from '../store/actions/shows';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { AppActions } from '../store/actions/types';

import { Container, Grid } from '@material-ui/core';

import TopBar from '../components/partials/TopBar';
import ShowsCard from '../components/partials/ShowsCard';
import SkeletonLoader from '../components/partials/SkeletonLoader';
import SearchBar from '../components/partials/SearchBar';

type OwnProps = {};
type ShowsStates = {}

type Props = OwnProps & StoreDispatchProps & StoreStateProps & RouteComponentProps

const Shows: React.FC<Props> = (props) => {
    const { fetchShows, isLoading } = props;

    const [shows, setShows] = useState<Array<{[key: string]: any}> | null>(null);
    // storing all movies in a single state to access them in the search functionality
    const [allShows, setAllShows] = useState<Array<{[key: string]: any}> | null>(null);
    const [category, setCategory] = useState<string>('');

    useEffect(() => {
        // Getting category from query param
        const queryParams = new URLSearchParams(props.location.search);
        const showsCategory = queryParams.get('category') as string;

        // Set category name to state ( To use it as a prop for topbar)
        setCategory(showsCategory);
        // Fetching the category data
        fetchShows(showsCategory).then(response => { // pass series Route query param
            setShows(response);
            setAllShows(response);
        });
    }, []);

    const searchShowsHandler = (value: string) => {
        // Get the searched text from the child
        const searchStr = value.toLowerCase();
        // Filter the shows according to the searched text;
        let filteredShows;

        if(searchStr.length > 0){
            filteredShows = allShows?.filter(m => m.title.toLowerCase().match(searchStr));
        } else if(searchStr.length === 0){
            filteredShows = allShows?.map(m => m);
        }

        // Set Shows state
        if(filteredShows){
            setShows(filteredShows);
        }
    }; 

    if(isLoading) return (
        <React.Fragment>
            <section>
                {/* query param */}
                <TopBar text={category} /> 
                <SkeletonLoader />
            </section>
        </React.Fragment>
    );

    return (
        <section>
            {/* query param */}
            <TopBar text={category} />
            <Container style={{ paddingBottom: 100 }}>
                <SearchBar 
                  searchShows={searchShowsHandler}
                  placeholder={`Search ${category}`}
                />
                <Grid 
                  container
                  spacing={4}
                >
                    {shows?.map(s => (
                        <Grid item
                          xs={2}
                          key={uuid()}
                          style={{ marginRight: 40, marginBottom: 40 }}
                        >
                            <ShowsCard    
                              cardTitle={s.title}
                              link={`/show?sname=${s.title.toLowerCase()}&category=${category.toLowerCase()}`}
                              imgUrl={s.images["Poster Art"].url}
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


export default withRouter(connect<StoreStateProps, StoreDispatchProps, OwnProps, AppState>(mapStateToProps, mapDispatchToProps)(Shows));