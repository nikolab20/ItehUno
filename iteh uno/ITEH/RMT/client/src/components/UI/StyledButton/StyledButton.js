import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// The `withStyles()` higher-order component is injecting a `classes`
// prop that is used by the `Button` component.
const StyledButton = withStyles({
    root: {
        color: 'white',
        fontSize: '20px'
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

export default StyledButton;

