import React, { useState, useContext } from 'react';

import Input from '../../shared/components/form-elements/Input';
import Button from '../../shared/components/form-elements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useForm } from '../../shared/hooks/form-hooks';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (isLoggingIn) {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formState.inputs.email.value,
              password: formState.inputs.password.value,
            }),
          }
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        auth.login();
      } else {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: formState.inputs.name.value,
              email: formState.inputs.email.value,
              password: formState.inputs.password.value,
            }),
          }
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        auth.login();
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err.message || 'Something went wrong. Please try again.');
    }
  };

  const switchModeHandler = () => {
    if (!isLoggingIn) {
      setFormData(
        { ...formState.inputs, name: null },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoggingIn((prevMode) => !prevMode);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className='authentication'>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Identify Yourself</h2>
        <hr />
        <form className='' onSubmit={submitHandler}>
          {!isLoggingIn && (
            <Input
              id='name'
              element='input'
              type='text'
              label='Name'
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Please enter a name.'
              onInput={inputHandler}
            />
          )}
          <Input
            id='email'
            element='input'
            type='email'
            label='Email'
            validators={[VALIDATOR_EMAIL()]}
            errorText='Please enter a valid email address.'
            onInput={inputHandler}
          />
          <Input
            id='password'
            element='input'
            type='password'
            label='Password'
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText='Please enter a valid password (min. 8 characters).'
            onInput={inputHandler}
          />
          <Button type='submit' disabled={!formState.isValid}>
            {isLoggingIn ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Button onClick={switchModeHandler} inverse>
          SWITCH TO {isLoggingIn ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
