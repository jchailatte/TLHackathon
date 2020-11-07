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
            main: '#19857b',
        },
        background:{
            default:'#fff',
        }
    },

}));

export default theme;