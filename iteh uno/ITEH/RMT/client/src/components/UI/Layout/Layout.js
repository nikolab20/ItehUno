import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.css';
import Toolbar from '../Toolbar/Toolbar.js';

class Layout extends Component {
    render() {
        return (
            <div>
                <Toolbar loggedIn={this.props.isLoggedIn} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.token !== null
    };
};

export default connect( mapStateToProps )( Layout );