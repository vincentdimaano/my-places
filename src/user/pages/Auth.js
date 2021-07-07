import React, { useState, useContext } from 'react';

import Input from '../../shared/components/form-elements/Input';
import Button from '../../shared/components/form-elements/Button';
import Card from '../../shared/components/UIElements/Card';
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

  const submitHandler = (event) => {
    event.preventDefault();
    auth.login();
  };

  const switchModeHandler = () => {
    if (!isLoggingIn) {
      setFormData(
        { ...formState.inputs,
          name: null },
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

  return (
    <Card className='authentication'>
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
  );
};

export default Auth;
