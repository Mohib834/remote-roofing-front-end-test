import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './utils/theme';

ReactDOM.render(
	<BrowserRouter>
		<React.StrictMode>
			<ThemeProvider theme={theme}>
			  <App />
			</ThemeProvider>
		</React.StrictMode>
	</BrowserRouter>,
	document.getElementById('root')
);

