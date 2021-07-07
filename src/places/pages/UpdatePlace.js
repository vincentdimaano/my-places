import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/form-elements/Input';
import Button from '../../shared/components/form-elements/Button';
import Card from '../../shared/components/UIElements/Card';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hooks';
import './PlaceForm.css';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Transamerica Pyramid',
    description: 'Iconic futurist building in the San Francisco skyline.',
    imageUrl:
      'https://www.maxpixel.net/static/photo/1x/Skyline-Transamerica-Pyramid-City-Cityscape-1633204.jpg',
    address: '600 Montgomery St, San Francisco, CA 94111',
    location: {
      lat: 37.7951775,
      lng: -122.4027787,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Transamerica Pyramid',
    description: 'Iconic futurist building in the San Francisco skyline.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/5/57/Transamerica_Pyramid_Columbus_Ave.jpg',
    address: '600 Montgomery St, San Francisco, CA 94111',
    location: {
      lat: 37.7951775,
      lng: -122.4027787,
    },
    creator: 'u2',
  },
];

const UpdatePlace = () => {
  const placeId = useParams().pid;

  const [isLoading, setIsLoading] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    true
  );

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const updateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState);
  };

  if (!identifiedPlace) {
    return (
      <div className='center'>
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='center'>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className='place-form' onSubmit={updateSubmitHandler}>
      <Input
        id='title'
        element='input'
        type='text'
        label='Title'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid title.'
        onInput={inputHandler}
        value={formState.inputs.title.value}
        valid={formState.inputs.title.isValid}
      />
      <Input
        id='description'
        element='textarea'
        label='Description'
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter a valid description (min. 5 characters).'
        onInput={inputHandler}
        value={formState.inputs.description.value}
        valid={formState.inputs.description.isValid}
      />
      <Button type='submit' disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
