import React from 'react';
import { Grid, Container, makeStyles, Typography, Box, useTheme, Theme } from '@material-ui/core';
import { Link } from 'react-router-dom';
// Icons
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

type OwnProps = {}
type Props = OwnProps;

const useStyles = makeStyles(theme => ({
	footer: {
		background: theme.palette.secondary.main,
		marginTop: 'auto',
		minHeight: '240px',
		display:'flex',
		alignItems: 'center',
		color:'rgba(255,255,255,.9)',
    fontSize: '15px',
    [theme.breakpoints.down('sm')]: {
      paddingTop: 30,
      paddingBottom: 20
    }
  },
  linksGrid: {
    marginBottom: 40,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 10,
    }
  },
  linksContainer: {
    marginBottom: 8,
    [theme.breakpoints.down('sm')]: {
      display:'flex',
      flexDirection: 'column',
    }
  },
	link: {
    textDecoration: 'none',
    fontWeight: 600,
		color:'rgba(255,255,255,.9)',
		marginRight: theme.spacing(4),
    position:'relative',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 5,
    },
		'&:not(:last-child)::after': {
			content: '""',
			width: '100%',
			height: '100%',
			position:'absolute',
			top: 0,
			left:15,
      borderRight: '1.5px solid #fff',
      [theme.breakpoints.down('sm')]: {
        borderRight: 0,
        marginBottom: 10,
      }
    }, 
  },
  socialContainer: {
    [theme.breakpoints.down('xs')]: {
      margin: '30px 0',
    }
  },
  socialGrid: {
    display:'flex', 
    alignItems:'center',
    marginBottom: 0,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 15,
    }
  },
  downloadContainer: {
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-end',
    }
  },
  copyrightText: {
    [theme.breakpoints.down('sm')]: {
     display:'none'
    }
  },
  copyrightTextBottom: {
    display: 'none',
    fontSize: 12,
    marginTop: 10,
    [theme.breakpoints.down('sm')]: {
      display:'block'
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

const Footer: React.FC<Props> = (props) => {
  const { footer, link, linksGrid, linksContainer, socialContainer, socialGrid, copyrightText, copyrightTextBottom, downloadContainer } = useStyles();
  const theme = useTheme<Theme>();

	return (
    <footer className={footer}>
        <Container>
            <Grid>
                <Grid item 
                  xs={12}
                  className={linksGrid}
                >
                    <Typography 
                      component="div"
                      className={linksContainer}
                      variant="body2"
                    >
                        { links.map((l, n) => <Link className={link}
                          color="inherit"
                          to="/"
                          key={n}
                        >{l.text}</Link>) }
                    </Typography>
                    <Typography 
                      component="span"
                      variant="body2"
                      className={copyrightText}
                    >
                        Copyright &copy; 2020 DEMO Streaming. All Rights Reserved.
                    </Typography>
                </Grid>
                <Grid container
                  className={socialContainer}
                >
                    <Grid 
                      item
                      xs={12}
                      sm={6}
                      className={socialGrid}
                    >
                        <Box>
                            <FacebookIcon style={{ marginLeft:'-3px', marginRight: '5px' }}/>
                            <TwitterIcon style={{ marginRight: '5px' }}/>
                            <InstagramIcon />
                        </Box>
                    </Grid>
                    <Grid 
                      item
                      xs={12}
                      sm={6}
                    >
                        <Box 
                          display="flex"
                          className={downloadContainer}
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
                <Grid container>
                    <Grid item>
                        <Typography 
                          component="span"
                          variant="body2"
                          className={copyrightTextBottom}
                        >
                            Copyright &copy; 2020 DEMO Streaming. All Rights Reserved.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    </footer>
	);
};

export default Footer;