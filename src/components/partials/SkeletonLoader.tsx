import React from 'react';
import { v4 as uuid } from 'uuid';

import { Container, Grid, Typography, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  skeleton: {
    background: theme.palette.secondary.main,
  }
}));

const Loader: React.FC = () => {
    const { skeleton } = useStyles();

    const arr = new Array(12);
    const skeletons = [...arr];


    return (
        <Container>
            <Grid container
              spacing={4}
            >
                <Grid item
                  xs={12}
                  style={{ marginBottom: 0, marginTop: -15 }}
                >
                    <Typography variant="h2">
                        <Skeleton 
                          className={skeleton}
                        />
                    </Typography>
                </Grid>
                { skeletons.map(() => (
                    <Grid item
                      xs={2}
                      key={uuid()}
                      style={{ marginRight: 40, marginBottom: 40, marginTop:-30, }}
                    > 
                        <Skeleton
                          className={skeleton}
                          variant="rect"
                          width={230}
                          height={320}
                        />
                    </Grid>
                  ))}
            </Grid>
        </Container>
    );
};

export default Loader;