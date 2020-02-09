import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>HOME</NavigationItem>
        <NavigationItem link="/register">REGISTER</NavigationItem>
        {!props.isLoggedIn ?
            <NavigationItem link="/auth">LOG IN</NavigationItem>
            : <NavigationItem link="/logout">LOG OUT</NavigationItem> }
    </ul>
);

export default navigationItems;