import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	typography: {
		fontSize: 16,
		fontFamily: `'Work Sans', sans-serif`,
		body1: {
			fontSize: 16,
		},
		body2: {
			fontSize: 14,
		}
	},
	palette: {
		primary: {
			main: '#017fff'
		},
		secondary: {
			main: '#2b2b2b'
		}
	},
	overrides: {
		MuiButton: {
			root: {
				borderRadius: 0,
				textTransform: 'initial'
			}
		},
		MuiCard: {
			root: {
				borderRadius: 0,
			}
		}
	}
});

export default theme;