import React from 'react';
import { AppBar, Toolbar, Button, Typography, Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	title: {
		flexGrow: 1,
	},
	login: {
		marginRight: theme.spacing(2),
	}
}))

const Navbar: React.FC = (props) => {
	const classes = useStyles();

	return (
		<AppBar position="static">
			<Container>
				<Toolbar>
					<Typography
						variant="h5"
						className={classes.title}>
							DEMO Streaming
					</Typography>
					<Button
					    size="small"
						className={classes.login}
						color="inherit">Log in</Button>
					<Button variant="contained"
					    size="small"
						color="secondary">Start your free trial</Button>
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default Navbar;