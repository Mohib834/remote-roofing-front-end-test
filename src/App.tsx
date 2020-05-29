import React from 'react';
import { Switch, Route } from 'react-router';
import { makeStyles } from '@material-ui/core';
// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// Pages
import Home from './containers/Home';

const useStyles = makeStyles((theme) => ({
	App: {
		display:'flex',
		flexDirection:'column',
		minHeight: '100vh',
	}
}))

const App: React.FC = () => {
	const classes = useStyles();
	return (
		<div className={ classes.App }>
			{/* navigation bar */}
			<Navbar />
			{/* main content */}
			<main>
				<Switch>
					<Route path="/"
						render={ () => <Home /> } />
				</Switch>
			</main>

			<Footer />
		</div>
	);
}

export default App;
