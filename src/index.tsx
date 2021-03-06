import './firebase/firebase';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/index';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './utils/theme';
import GlobalSnackBar from './components/partials/GlobalSnackBar';

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <GlobalSnackBar />
                    <App />
                </ThemeProvider>
            </Provider>
        </React.StrictMode>
    </BrowserRouter>,
	document.getElementById('root')
);

