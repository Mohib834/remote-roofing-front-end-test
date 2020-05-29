import React from 'react';
import { Grid, Container, makeStyles, Typography, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
// Icons
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

const useStyles = makeStyles(theme => ({
	footer: {
		background: theme.palette.secondary.main,
		marginTop: 'auto',
		height: '240px',
		display:'flex',
		alignItems: 'center',
		color:'rgba(255,255,255,.9)',
		fontSize: '15px',
	},
	links: {
      textDecoration: 'none',
      fontWeight: 600,
		color:'rgba(255,255,255,.9)',
		marginRight: theme.spacing(4),
		position:'relative',
		'&:not(:last-child)::after': {
			content: '""',
			width: '100%',
			height: '100%',
			position:'absolute',
			top: 0,
			left:15,
			borderRight: '1.5px solid #fff'
		}
	}
	
}));

const links =  [
	{ link: '/', text: 'Home' },
	{ link: '/', text: 'Terms and Conditions' },
	{ link: '/', text: 'Privacy Policy' },
	{ link: '/', text: 'Collection Statement' },
	{ link: '/', text: 'Help' },
	{ link: '/', text: 'Manage Account' },
];

const Footer: React.FC = (props) => {
	const classes = useStyles();
	return (
    <footer className={classes.footer}>
        <Container>
            <Grid>
                <Grid item 
                  xs={12}
                  style={{ marginBottom: '40px' }}
                >
                    <Typography 
                      component="div"
                      style={{ marginBottom: '8px' }}
                      variant="body2"
                    >
                        { links.map((l, n) => <Link className={classes.links}
                          color="inherit"
                          to="/"
                          key={n}
                        >{l.text}</Link>) }
                    </Typography>
                    <Typography 
                      component="div"
                      variant="body2"
                    >
                        Copyright &copy; 2020 DEMO Streaming. All Rights Reserved.
                    </Typography>
                </Grid>
                <Grid container>
                    <Grid 
                      item
                      xs={6}
                      style={{ display:'flex', alignItems:'center' }}
                    >
                        <Box>
                            <FacebookIcon style={{ marginLeft:'-3px', marginRight: '5px' }}/>
                            <TwitterIcon style={{ marginRight: '5px' }}/>
                            <InstagramIcon />
                        </Box>
                    </Grid>
                    <Grid 
                      item
                      xs={6}
                    >
                        <Box display="flex"
                          justifyContent="flex-end"
                        >
                            <a href="#">
                                <img width="130px"
                                  style={{ marginRight: 15 }}
                                  alt="Download on Apple store"
                                  src={require('assets/appstore.png')}
                                />
                            </a>
                            <a href="#">
                                <img width="130px"
                                  alt="Download on Google play"
                                  src={require('assets/googleplay.png')}
                                />
                            </a>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    </footer>
	);
};

export default Footer;