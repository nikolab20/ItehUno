import React from 'react';

import classes from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isLoggedIn={props.loggedIn} />
        </nav>
    </header>
);

export default toolbar;
