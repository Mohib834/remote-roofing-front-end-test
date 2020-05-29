import React from 'react'
import { Grid, Container, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	footer: {
		background: theme.palette.secondary.main,
		marginTop: 'auto',
		height: '210px',
		display:'flex',
		alignItems: 'center',
	}
}))

const links =  [
	{ link: '/', text: 'Home' },
	{ link: '/', text: 'Terms and Conditions' },
	{ link: '/', text: 'Privacy Policy' },
	{ link: '/', text: 'Collection Statement' },
	{ link: '/', text: 'Help' },
	{ link: '/', text: 'Manage Account' },
]

const Footer: React.FC = (props) => {
	const classes = useStyles();
	return (
		<footer className={classes.footer}>
			<Container>
				<Grid>
					<Grid xs={12}>
						{ links.map((l, n) => <div key={n}>{l.text}</div>) }
					</Grid>
					<Grid container>
						<Grid xs={6}>
								social
						</Grid>
						<Grid xs={6}>
								downloads
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</footer>
	)
}

export default Footer;