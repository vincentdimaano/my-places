import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Transamerica Pyramid',
    description: 'Iconic futurist building in the San Francisco skyline.',
    imageUrl: 'https://www.maxpixel.net/static/photo/1x/Skyline-Transamerica-Pyramid-City-Cityscape-1633204.jpg',
    address: '600 Montgomery St, San Francisco, CA 94111',
    location: {
      lat: 37.7951775,
      lng: -122.4027787
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Transamerica Pyramid',
    description: 'Iconic futurist building in the San Francisco skyline.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Transamerica_Pyramid_Columbus_Ave.jpg',
    address: '600 Montgomery St, San Francisco, CA 94111',
    location: {
      lat: 37.7951775,
      lng: -122.4027787
    },
    creator: 'u2'
  }
];

const UserPlaces = () => {
  const userId = useParams().uid;
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)

  return <PlaceList item={loadedPlaces}/>
};

export default UserPlaces;