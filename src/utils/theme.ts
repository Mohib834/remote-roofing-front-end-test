import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	typography: {
		fontSize: 16,
		fontFamily: `'Work Sans', sans-serif`,
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
		}
	}
})

export default theme;