import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = responsiveFontSizes(createMuiTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#000000',
        },
        error: {
            main: red.A400,
        },
        background:{
            default:'#0C223F',
        }
    },

}));

export default theme;