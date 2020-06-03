import React from 'react';
import { CircularProgress, Container, makeStyles } from '@material-ui/core';

type Props = {};

const useStyles = makeStyles({
    loaderContainer: {
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        height: '100vh',
    },
    loader: {
        color: '#fff',

    }
});

const CircularLoader: React.FC<Props> = (props) => {
    const { loader, loaderContainer } = useStyles();
    return (
        <section>
            <Container className={loaderContainer}>
                <CircularProgress className={loader}
                  size={25}
                />
            </Container>
        </section>
    );
};

export default CircularLoader;