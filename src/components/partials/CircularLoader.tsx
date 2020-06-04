import React from 'react';
import { CircularProgress, Container, makeStyles } from '@material-ui/core';

type Props = {
    fullHeight?: boolean;
};

const useStyles = makeStyles({
    loaderContainer: (props: Props) => ({
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        height: props.fullHeight ? '100vh' : '38vh',
    }),
    loader: {
        color: '#fff',

    }
});

const CircularLoader: React.FC<Props> = (props) => {
    const { loader, loaderContainer } = useStyles(props);
    return (
        <Container className={loaderContainer}>
            <CircularProgress className={loader}
              size={25}
            />
        </Container>
    );
};

CircularLoader.defaultProps = {
    fullHeight: false,
};

export default CircularLoader;