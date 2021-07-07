import { React } from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Egg Man',
      image:
        'https://www.publicdomainpictures.net/pictures/270000/velka/egg-man-1531689071jsQ.jpg',
      places: 3
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
