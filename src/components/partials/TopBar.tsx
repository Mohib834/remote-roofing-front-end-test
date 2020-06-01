import React from 'react';
import { AppBar, Container, Toolbar, Typography, makeStyles } from '@material-ui/core';

type TopBarProps = {
    text: string;
}

const useStyles = makeStyles({
    title: {
        fontWeight: 400,
        textTransform: 'capitalize',
    },
    topBar: {
        marginBottom: 30,
    }
});

const TopBar: React.FC<TopBarProps> = (props) => {
    const classes = useStyles();
    
    return (
        <AppBar className={classes.topBar}
          color="secondary"
          position="static"
        >
            <Container>
                <Toolbar style={{ padding: 0 }}>
                    <Typography
                      variant="h6"
                      className={classes.title}
                    >
                        { props.text }
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default TopBar;