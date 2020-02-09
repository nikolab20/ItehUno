import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#f44336'
        },
        secondary: {
            main: '#ffeb3b'
        }
    }
},
)

export default function LinearQuery() {
    const classes = useStyles();

    return (
            <MuiThemeProvider theme={theme}>
                <LinearProgress color="primary" variant="query" />
                <br />
                <LinearProgress color="secondary" variant="query" />
            </MuiThemeProvider>    

    );
}