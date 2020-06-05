import React from 'react';
import { Container, Grid, useTheme, Theme, makeStyles } from '@material-ui/core';
import TopBar from '../components/partials/TopBar';
import ShowsCard from '../components/partials/ShowsCard';

type OwnProps = {} // Props to define ( if there are any )

type Props = OwnProps;

const useStyles = makeStyles(theme => ({
  showsGrid: {
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    }
  }
}));

const Home: React.FC<Props> = (props) => {
  const { showsGrid } = useStyles();

	return (
    <section>
        <TopBar text="Popular titles" />
        <Container style={{ paddingBottom: 30 }}>
            <Grid 
              container
              spacing={2}
              className={showsGrid}
            >
                <Grid item>
                    <ShowsCard    
                      cardTitle="Popular Movies"
                      isGenre
                      genreTitle="Movies"
                      link="/shows?category=movies"
                    />
                </Grid>
                <Grid item>
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