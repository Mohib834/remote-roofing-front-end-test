import React from 'react';
import { makeStyles, Box } from '@material-ui/core';

type Props = {
    value: number;
}

const useStyles = makeStyles(theme => ({
    ratings: {
        width: 60,
        height:60,
        borderRadius: 100,
        border: '5px solid',
        borderColor: theme.palette.primary.main,
        fontSize: 25,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        fontWeight:600,
    }
}));

const Ratings: React.FC<Props> = (props) => {
    const { ratings } = useStyles();
    return (
        <Box className={ratings}>
            <div style={{ marginTop: -5 }}>
                <span>{props.value}</span>
            </div>
        </Box>
    );
};

export default Ratings;