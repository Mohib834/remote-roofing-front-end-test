import React from 'react';
import { Container, Grid } from '@material-ui/core';
import TopBar from '../components/partials/TopBar';
import MovieCard from '../components/partials/MovieCard';
import { RouteComponentProps } from 'react-router-dom';

type Props = {} // Props to define ( if there are any )

type ComposedProps = Props & RouteComponentProps<{}>; // Props with router props

const Home: React.FC<ComposedProps> = (props) => {
	return (
    <section>
        <TopBar text="Popular titles" />
        <Container>
            <Grid 
              container
            >
                <Grid item
                  xs={2}
                  style={{ marginRight: 20 }}
                >
                    <MovieCard    
                      cardTitle="Popular Movies"
                      isGenre
                      genreTitle="Movies"
                      link="/movies"
                    />
                </Grid>
                <Grid item
                  xs={2}
                >
                    <MovieCard 
                      cardTitle="Popular Series"
                      isGenre
                      genreTitle="Series"
                      link="/series"
                    />
                </Grid>
            </Grid>
        </Container>
    </section>
	);
};

export default Home;