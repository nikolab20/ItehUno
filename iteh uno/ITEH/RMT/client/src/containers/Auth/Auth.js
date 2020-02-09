import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        authFormElements: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'username',
                    placeholder: 'Username'
                },
                value: '',
                validation: {
                    required: true,
                    isUsername: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }
    };

    checkValidity(value, rules) {
        let isValid = true;

        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() != '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    };

    onInputChangeHandler = (event, authFormElement) => {
        const updatedAuthFormElements = {
            ...this.state.authFormElements,
            [authFormElement]: {
                ...this.state.authFormElements[authFormElement],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.authFormElements[authFormElement].validation),
                touched: true
            }
        };

        this.setState({ authFormElements: updatedAuthFormElements });
    }

    submitFormHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.authFormElements.username.value, this.state.authFormElements.password.value);
    };

    render() {
        const formElArray = [];
        for (let key in this.state.authFormElements) {
            formElArray.push({
                id: key,
                config: this.state.authFormElements[key]
            });
        }

        let form = formElArray.map(formEl => (
            <Input
                key={formEl.id}
                elementType={formEl.config.elementType}
                elementConfig={formEl.config.elementConfig}
                value={formEl.config.value}
                invalid={!formEl.config.valid}
                touched={formEl.config.touched}
                shouldValidate={formEl.config.validation}
                changed={(event) => this.onInputChangeHandler(event, formEl.id)}
            />
        ));

        if (this.props.loading) {
            form = <Spinner />;
        }

        let message = null;

        if (this.props.message) {
            message = (
                <p>{this.props.message}</p>
            );
        }
        else if (this.props.error) {
            message = (
                <p>{this.props.error.message}</p>
            );
        };

        return (
            <div className={classes.Auth}>
                { message }
                <form onSubmit={this.submitFormHandler}>
                    {form}
                    <Button btnType="Success">LOG IN</Button>
                </form>
                {this.props.token ? <Redirect to="/" /> : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        message: state.auth.message,
        error: state.auth.error,
        token: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.auth(username, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);