import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// The `withStyles()` higher-order component is injecting a `classes`
// prop that is used by the `Button` component.
const DrawButton = withStyles({
    root: {
        float: 'right',
        marginRight: '20px',
        height: '95px',
        width: '50px',
        lineHeight: '95px',
        borderRadius: '5px',
        marginTop: '175px',
        backgroundImage: 'url("https://opengameart.org/sites/default/files/UNO-Back_0.png")',
        backgroundSize: 'contain',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

export default DrawButton;

