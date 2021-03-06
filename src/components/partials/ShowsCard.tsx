import React, { useState } from 'react';
import {  Card, CardContent, Typography, makeStyles, Box, ButtonBase, CircularProgress } from '@material-ui/core';
import { RouteComponentProps, withRouter } from 'react-router-dom';

type OwnProps = {
    cardTitle: string;
    link?: string; 
    genreTitle?: string;
    isGenre?: boolean; // Whether it is a genre card or movie/series card
    imgUrl?: string;
    routeProps?: RouteComponentProps;
    width?: number;
    height?: number;
}

type Props = OwnProps & RouteComponentProps

const useStyles = makeStyles((theme) => ({
    showsCard:{
        background: theme.palette.secondary.main,
        width: (props: Props) => props.width ? props.width : 230,
        height: (props: Props) => props.height ? props.height : 320,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize: 'contain',
        position:'relative',
        '&:hover': {
            "& $showsGenre":{
                top:'50%',
                opacity:1,
            },
            "& $showsImg": {
                filter: 'brightness(.9)'
            }
        }
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
        top: '70%',
        opacity: 0,
        left: '50%',
        transform:'translate(-50%, -50%)',
        transition: 'all .3s'
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
        const { link } = props;

        if(link){
            props.history.push(link);
        }
    };

    const onImgLoadHandler = () => {
        setImgLoading(false);
    };

    return (
        <Box>
            <ButtonBase onClick={redirect}
              style={{ boxShadow: '0 8px 15px rgba(0, 0, 0, .5)' }}
            >
                <Card
                  color="secondary"
                  className={showsCard}
                >
                    <CardContent className={showsCardContent}>
                        { props.isGenre ? (
                            <React.Fragment>
                                <img className={categoryImg}
                                  alt="film icon"
                                  src={require('assets/svgs/film.svg')}
                                />
                                <Typography className={showsGenre}>
                                    { props.genreTitle}
                                </Typography>
                            </React.Fragment>
                        ): (
                            <React.Fragment>
                                <CircularProgress size={25}
                                  style={{ color:'#fff', display: isImgLoading ? 'block' : 'none' }}
                                />
                                <img className={showsImg}
                                  src={props.imgUrl}
                                  alt="show poster"
                                  style={{ display: isImgLoading ? 'none' : 'block' }}
                                  onLoad={onImgLoadHandler}
                                />
                            </React.Fragment>
                        )}
                    </CardContent>
                </Card>
            </ButtonBase>
            <Typography variant="body2"
              style={{ fontWeight: 600, marginTop:5, color:'#fff', maxWidth: props.width ? props.width : 230 }}
            >
                { props.cardTitle }
            </Typography>
        </Box>
    );
};

ShowsCard.defaultProps = {
    isGenre: false,
};

export default withRouter(ShowsCard);