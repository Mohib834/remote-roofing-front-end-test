import React from 'react';
import { Container, Grid } from '@material-ui/core';
import TopBar from '../components/partials/TopBar';
import ShowsCard from '../components/partials/ShowsCard';
import { RouteComponentProps } from 'react-router-dom';

type OwnProps = {} // Props to define ( if there are any )

type Props = OwnProps & {
  routeProps: RouteComponentProps<{}>;
}; // Props with router props

const Home: React.FC<Props> = (props) => {
	return (
    <section>
        <TopBar text="Popular titles" />
        <Container>
            <Grid 
              container
            >
                <Grid item
                  xs={2}
                  style={{ marginRight: 40 }}
                >
                    <ShowsCard    
                      cardTitle="Popular Movies"
                      isGenre
                      genreTitle="Movies"
                      link="/shows?category=movies"
                      routeProps={props.routeProps}
                    />
                </Grid>
                <Grid item
                  xs={2}
                >
                    <ShowsCard 
                      cardTitle="Popular Series"
                      isGenre
                      genreTitle="Series"
                      link="/shows?category=series"
                      routeProps={props.routeProps}
                    />
                </Grid>
            </Grid>
        </Container>
    </section>
	);
};

export default Home;