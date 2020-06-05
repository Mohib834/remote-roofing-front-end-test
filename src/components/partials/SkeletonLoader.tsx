import React from 'react';
import { v4 as uuid } from 'uuid';

import { Container, Grid, Typography, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  skeletonStyle: {
    background: theme.palette.secondary.main,
  },
}));

const skeletons: Array<number> = [];

for(let i = 0; i <= 11; i++){
  skeletons.push(i);
}

const SkeletonLoader: React.FC = () => {
    const { skeletonStyle } = useStyles();

    return (
        <Container>
            <Grid
              container
            >
                <Grid item
                  xs={12}
                  style={{ marginBottom: 20, marginTop:-18 }}
                >
                    <Typography variant="h2">
                        <Skeleton 
                          className={skeletonStyle}
                        />
                    </Typography>
                </Grid>
                <Grid container
                  spacing={2}
                  justify="center"
                >
                    { skeletons.map(() => (
                        <Grid item
                          key={uuid()}
                          style={{ marginRight: 3.6, marginBottom: 40, marginTop: -15 }}
                        > 
                            <Skeleton
                              className={skeletonStyle}
                              variant="rect"
                              width={230}
                              height={320}
                            />
                        </Grid>
                  ))}
                </Grid>
            </Grid>
        </Container>
    );
};

export default SkeletonLoader;