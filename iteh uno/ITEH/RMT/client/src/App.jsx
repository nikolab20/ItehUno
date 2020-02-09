import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { connect } from 'react-redux';

const Switch = ReactRouterDOM.Switch;
const Route = ReactRouterDOM.Route;

import Uno from '../src/components/UNO/Uno';
import Auth from '../src/containers/Auth/Auth';
import Register from '../src/containers/Register/Register';
import Layout from '../src/components/UI/Layout/Layout';
import Logout from '../src/containers/Auth/Logout/Logout';

export default class App extends React.Component {

    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/register" component={Register} />
                        <Route path="/auth" component={Auth} />
                        <Route path="/logout" component={Logout} />
                        <Route path='/' exact component={Uno} />
                    </Switch>
                </Layout>
            </div>
        );
    };
}
