import React from 'react';
import {  Card, CardContent, Typography, makeStyles, Box, ButtonBase } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';

type Props = {
    cardTitle: string;
    link: string; 
    genreTitle?: string;
    isGenre?: boolean; // Whether it is a genre card or movie/series card
    routeProps: RouteComponentProps;
}

const useStyles = makeStyles((theme) => ({
    movieCard: {
        background: theme.palette.secondary.main,
        width: 200,
        height: 280,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    filmImg: {
        width: '70%',
        margin:'auto',
        height: '100%',
        objectFit: 'cover',
    },
    movieCardContent: {
        padding: '30px', 
        display: 'flex',
        justifyContent: 'center',
        position:'relative',
    },
    movieGenre: {
        position:'absolute',
        zIndex: 100,
        fontSize: 35,
        fontWeight: 600,
        color: '#fff',
        top: '50%',
        left: '50%',
        transform:'translate(-50%, -50%)'
    }
}));

const MovieCard: React.FC<Props> = (props) => {
    const { movieCard, movieCardContent, movieGenre, filmImg } = useStyles();

    const redirect = (): void => {
        const { routeProps, link } = props;
        routeProps.history.push(link);
    };

    return (
        <Box>
            <ButtonBase onClick={redirect}>
                <Card
                  color="secondary"
                  className={movieCard}
                >
                    <CardContent className={movieCardContent}>
                        { props.isGenre && (
                            <React.Fragment>
                                <img className={filmImg}
                                  src={require('assets/svgs/film.svg')}
                                />
                                <Typography className={movieGenre}>
                                    { props.genreTitle}
                                </Typography>
                            </React.Fragment>
                        )}
                    </CardContent>
                </Card>
            </ButtonBase>
            <Typography variant="body2"
              style={{ fontWeight: 600 }}
            >
                { props.cardTitle }
            </Typography>
        </Box>
    );
};

MovieCard.defaultProps = {
    isGenre: false,
};

export default MovieCard;