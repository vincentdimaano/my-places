import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useHttpClient } from '../../shared/hooks/http-hook';
import PlaceList from '../components/PlaceList';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const UserPlaces = () => {
  const userId = useParams().uid;
  const [loadedPlaces, setLoadedPlaces] = useState();

  const { isLoading, error, clearError, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = (deletedPlace) => {
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place=> place.id !== deletedPlace));
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}/>
      {isLoading && <div className="center">
        <LoadingSpinner />
        </div>}
      {!isLoading && loadedPlaces && <PlaceList item={loadedPlaces} onDeletePlace={placeDeletedHandler} />}
    </React.Fragment>
    );
};

export default UserPlaces;
