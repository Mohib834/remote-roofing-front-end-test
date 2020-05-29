import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router';
import { makeStyles } from '@material-ui/core';
// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// Pages
import Home from './views/home';
import Series from './views/series';

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
                  render={ () => <Series /> }
                />
                <Route 
                  path="/"
                  render={ (routeProps): any => <Home { ...routeProps } /> }
                />
            </Switch>
        </main>

        <Footer />
    </div>
	);
};

export default App;
