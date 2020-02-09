import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// The `withStyles()` higher-order component is injecting a `classes`
// prop that is used by the `Button` component.

const CardButton = (props) => withStyles({
    
    root: {
        color: 'white',
        fontSize: '20px',
        borderRadius: '5px',
        height: '95px',
        marginTop: '330px',
        marginLeft: '5px',
        width: '50px',
        backgroundImage: props.children,
        backgroundSize: 'contain',
        float: 'inherit',
        onClick: props.onClick
    },
    label: {
        textTransform: 'capitalize'
    }
})(Button);

export default CardButton;

