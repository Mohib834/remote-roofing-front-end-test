import React from 'react';
import { Container, Grid } from '@material-ui/core';
import TopBar from '../components/partials/TopBar';
import ShowsCard from '../components/partials/ShowsCard';

type OwnProps = {} // Props to define ( if there are any )

type Props = OwnProps;

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
                    />
                </Grid>
            </Grid>
        </Container>
    </section>
	);
};

export default Home;