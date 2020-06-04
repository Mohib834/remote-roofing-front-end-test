import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	shape: {
		borderRadius:0,
	},
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
			main: '#165595'
		},
		secondary: {
			main: '#2b2b2b'
		}
	},
	overrides: {
		MuiButton: {
			root: {
				textTransform: 'initial'
			}
		},
		MuiBadge: {
			badge: {
				boxShadow: '0 5px 5px rgba(0,0,0,.1)'
			}
		},
		MuiMenu: {
			paper: {
				background: '#2b2b2b',
				color: '#fff',
			},
			list: {
				width: 160,
			}
		}
	}
});

export default theme;