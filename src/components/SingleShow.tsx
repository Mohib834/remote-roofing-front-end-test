import React from 'react';
import { Container, Card, CardContent, makeStyles, Typography } from '@material-ui/core';

type OwnProps = {};
type Props = OwnProps;

const useStyles = makeStyles({
    show: {
        height: '80vh',
    },
    showCard: {
        width: '100%',
        height: '100%',
        background: `linear-gradient(to bottom, rgba(0,0,0,.3), rgba(0,0,0.3)), url('https://streamcoimg-a.akamaihd.net/000/843/787/843787-PosterArt-dafc8872838e5d0f806c895b62134021.jpg')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition:'center',
    },
    showCardContent: {
        padding: 100,
        color: '#fff',
    }
});

const SingleShow: React.FC<Props> = () => {
    const { showCard, show, showCardContent } = useStyles();
    return (
        <Container className={show}>
            <Card className={showCard}>
                <CardContent className={showCardContent}>
                    <Typography variant="h2"
                      style={{ fontWeight: 'bold', marginBottom: 10 }}
                    >
                        Joker
                    </Typography>
                    <Typography style={{ width:'50%', marginBottom: 20 }}
                      variant="body1"
                    >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                    </Typography>
                    <Typography variant="body2"
                      style={{ textTransform: 'uppercase', letterSpacing: 1 }}
                    >
                        <strong>Category</strong> : Movie
                        <br />
                        <strong>Release Year</strong> : 2015
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default SingleShow;