import React, { useEffect } from 'react';
import TopBar from '../components/partials/TopBar';
import Loader from '../components/partials/Loader';

import { connect } from 'react-redux';
import * as actionCreator from '../store/actions/movies';
import { AppState } from '../store/reducers';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../store/actions/types';
import { bindActionCreators } from 'redux';

// Props and state of the component
type OwnProps = {}
type MoviesState = {}

type Props = OwnProps & StoreDispatchProps & StoreStateProps

const Movies: React.FC<Props> = (props) => {
    const { fetchMovies, movies, isLoading } = props;

    useEffect(() => {
        // Call the dispatch action
        fetchMovies();
    }, []);

    if(isLoading) return <Loader />;

    return (
        <section>
            <TopBar text="Movies" />
            <div>
                { movies?.[0].title }
            </div>
        </section>
    );
};

// Props of the action and state
type StoreStateProps = {
     movies: Array<{[key: string]: any}> | null;
     isLoading: boolean;
}

type StoreDispatchProps = {
    fetchMovies: Function;
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StoreStateProps => {
    return {
        movies: state.movies.moviesData,
        isLoading: state.movies.isLoading,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProps: OwnProps): StoreDispatchProps => {
    return {
        fetchMovies: () => bindActionCreators(actionCreator.startFetchMoviesData, dispatch)
    };
};

export default connect<StoreStateProps, StoreDispatchProps, OwnProps, AppState>(mapStateToProps, mapDispatchToProps)(Movies);