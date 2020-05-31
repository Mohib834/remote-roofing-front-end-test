import React from 'react';
import { Switch, Route } from 'react-router';
import { makeStyles } from '@material-ui/core';
// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// Containers or Pages
import Home from './containers/home';
import Series from './containers/series';
import Movies from './containers/movies';

const useStyles = makeStyles((theme) => ({
	app: {
		display:'flex',
		flexDirection:'column',
		minHeight: '100vh',
   },
   main: {
      minHeight: 550,
   }
}));

const App: React.FC = () => {
    const { app, main } = useStyles();
   
	return (
    <div className={ app }>
        {/* navigation bar */}
        <Navbar />
        {/* main content */}
        <main className={main}>
            <Switch>
                <Route
                  path="/series"
                  render={ (routeProps): any => <Series routeProps={routeProps} /> }
                />
                <Route
                  path="/movies"
                  render={ (routeProps): any => <Movies routeProps={routeProps} /> }
                />
                <Route 
                  path="/"
                  render={ (routeProps): any => <Home routeProps={routeProps} /> }
                />
            </Switch>
        </main>

        <Footer />
    </div>
	);
};

export default App;
