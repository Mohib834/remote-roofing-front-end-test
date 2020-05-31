import React from 'react';
import { v4 as uuid } from 'uuid';

import { Container, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const Loader: React.FC = () => {
    const arr = new Array(12);
    const skeletons = [...arr];

    return (
        <Container>
            <Grid container>
                { skeletons.map(() => (
                    <Grid item
                      xs={2}
                      key={uuid()}
                      style={{ marginRight: 40, marginBottom: 40 }}
                    > 
                        <Skeleton
                          style={{ background: 'rgba(0,0,0,.1)' }}
                          variant="rect"
                          width={220}
                          height={310}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Loader;