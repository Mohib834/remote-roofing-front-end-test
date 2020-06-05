import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../store/reducers';
import { ThunkDispatch } from 'redux-thunk';
import * as actionCreator from '../store/actions/shows';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { AppActions } from '../store/actions/types';

import { Container, Grid, makeStyles } from '@material-ui/core';

import TopBar from '../components/partials/TopBar';
import ShowsCard from '../components/partials/ShowsCard';
import SkeletonLoader from '../components/partials/SkeletonLoader';
import SearchBar from '../components/partials/SearchBar';

import emptyImg from '../assets/svgs/empty.svg';

type OwnProps = {};

type Props = OwnProps & StoreDispatchProps & RouteComponentProps

const useStyles = makeStyles(theme => ({
    showsGrid: {
        [theme.breakpoints.down("md")]: {
            justifyContent: "center"
        }
    }
}));

const Shows: React.FC<Props> = (props) => {
    const { showsGrid } = useStyles();
    const [shows, setShows] = useState<Array<{[key: string]: any}> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
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
        props.fetchShows(showsCategory).then(response => { // pass series Route query param
            setShows(response);
            setAllShows(response);
            
            setIsLoading(false);
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
                  spacing={2}
                  className={showsGrid}
                >
                    {shows?.length !== 0 ? shows?.map(s => (
                        <Grid item
                          key={uuid()}
                          style={{ marginBottom: 40, marginRight: 3.6 }}
                        >
                            <ShowsCard    
                              cardTitle={s.title}
                              link={`/show?sname=${s.title.toLowerCase()}&category=${category.toLowerCase()}`}
                              imgUrl={s.images["Poster Art"].url}
                            />
                        </Grid>
                    )) : (
                        <Grid item
                          xs={12}
                          style={{ margin: '40px 0', display: 'flex', justifyContent: 'center' }}
                        >
                            <img src={emptyImg}
                              style={{ maxWidth: 350 }}
                            />
                        </Grid>
                    )}
                </Grid>
            </Container>
        </section>
    );
};

type StoreDispatchProps = {
    fetchShows: (category: string) => Promise<Array<{[key: string]: any}>>;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProps: OwnProps): StoreDispatchProps => ({
    fetchShows: (category: string) => dispatch(actionCreator.startFetchShowsData(category))
});


export default withRouter(connect<{}, StoreDispatchProps, OwnProps, AppState>(null, mapDispatchToProps)(Shows));