import React from 'react';

import Comments from '../components/Comments';
//  import { Navigate, useParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_USER, GET_ME } from '../utils/queries';
//import Auth from '../utils/auth';

const Profile = () =>{
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? GET_USER : GET_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};
console.log(user);

  // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //   return <Navigate to="/profile"/>;
  // }
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }
  return (
<div>
<div className="flex-row mb-3">
  <h2 className="bg-dark text-secondary p-3 display-inline-block">
  Welcome {user.username} to your profile.
  </h2>
  </div>
  <div className="mb-3">{!userParam && <Comments />}</div>
</div>
  );
};








export default Profile;