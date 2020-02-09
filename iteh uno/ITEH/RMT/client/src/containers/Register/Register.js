import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Register.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Register extends Component {

    state = {
        registerFormElements: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            surname: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Surname'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'username',
                    placeholder: 'Username'
                },
                value: '',
                validation: {
                    required: true,
                    isUsername: true,
                    alreadyExist: false
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
    }

    onInputChangeHandler = (event, regFormElement) => {
        const updatedFormElements = {
            ...this.state.registerFormElements,
            [regFormElement]: {
                ...this.state.registerFormElements[regFormElement],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.registerFormElements[regFormElement].validation),
                touched: true
            }
        };

        this.setState({ registerFormElements: updatedFormElements });
    }

    submitFormHandler = (event) => {
        event.preventDefault();
        this.props.onRegister(
            this.state.registerFormElements.name.value,
            this.state.registerFormElements.surname.value,
            this.state.registerFormElements.email.value,
            this.state.registerFormElements.username.value,
            this.state.registerFormElements.password.value);
    }

    render() {
        const registerElArray = [];
        for (let key in this.state.registerFormElements) {
            registerElArray.push({
                id: key,
                config: this.state.registerFormElements[key]
            });
        }

        let form = registerElArray.map(registerEl => (
            <Input
                key={registerEl.id}
                elementType={registerEl.config.elementType}
                elementConfig={registerEl.config.elementConfig}
                value={registerEl.config.value}
                invalid={!registerEl.config.valid}
                touched={registerEl.config.touched}
                shouldValidate={registerEl.config.validation}
                changed={(event) => this.onInputChangeHandler(event, registerEl.id)}
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
        }

        return (
            <div className={classes.Register}>
                { message }
                <form onSubmit={this.submitFormHandler}>
                    {form}
                    <Button btnType='Success'>REGISTER</Button>
                </form>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        loading: state.register.loading,
        message: state.register.message,
        error: state.register.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (name, surname, email, username, password) => dispatch(actions.register(name, surname, email, username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
