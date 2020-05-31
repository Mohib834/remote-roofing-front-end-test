import React, { useState } from 'react';
import {  Card, CardContent, Typography, makeStyles, Box, ButtonBase, CircularProgress } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';

type Props = {
    cardTitle: string;
    link: string; 
    genreTitle?: string;
    isGenre?: boolean; // Whether it is a genre card or movie/series card
    imgUrl?: string;
    routeProps: RouteComponentProps;
}

const useStyles = makeStyles((theme) => ({
    showsCard:{
        background: theme.palette.secondary.main,
        width: 230,
        height: 320,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize: 'contain',
        position:'relative',
    },
    categoryImg: {
        width: '70%',
        margin:'auto',
        height: '100%',
        objectFit: 'cover',
    },
    showsCardContent: {
        padding: '30px !important', 
        display: 'flex',
        justifyContent: 'center',

    },
    showsGenre: {
        position:'absolute',
        zIndex: 100,
        fontSize: 35,
        fontWeight: 600,
        color: '#fff',
        top: '50%',
        left: '50%',
        transform:'translate(-50%, -50%)'
    },
    showsImg: {
        position:'absolute',
        top: 0,
        left:0,
        width:'100%',
        height:'100%',
        objectFit: 'cover',
    }
}));

const ShowsCard: React.FC<Props> = (props) => {
    const { showsCard, showsCardContent, showsGenre, categoryImg, showsImg } = useStyles(props);

    const [isImgLoading, setImgLoading] = useState(true);

    const redirect = (): void => {
        const { routeProps, link } = props;
        routeProps.history.push(link);
    };

    const onImgLoadHandler = () => {
        setImgLoading(false);
    };

    return (
        <Box>
            <ButtonBase onClick={redirect}>
                <Card
                  color="secondary"
                  className={showsCard}
                >
                    <CardContent className={showsCardContent}>
                        { props.isGenre ? (
                            <React.Fragment>
                                <img className={categoryImg}
                                  src={require('assets/svgs/film.svg')}
                                />
                                <Typography className={showsGenre}>
                                    { props.genreTitle}
                                </Typography>
                            </React.Fragment>
                        ): (
                            <React.Fragment>
                                <CircularProgress size={30}
                                  style={{ display: isImgLoading ? 'block' : 'none' }}
                                />
                                <img className={showsImg}
                                  src={props.imgUrl}
                                  style={{ display: isImgLoading ? 'none' : 'block' }}
                                  onLoad={onImgLoadHandler}
                                />
                            </React.Fragment>
                        )}
                    </CardContent>
                </Card>
            </ButtonBase>
            <Typography variant="body2"
              style={{ fontWeight: 600, marginTop:5 }}
            >
                { props.cardTitle }
            </Typography>
        </Box>
    );
};

ShowsCard.defaultProps = {
    isGenre: false,
};

export default ShowsCard;