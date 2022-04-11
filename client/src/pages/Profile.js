import React from "react";
import { Navigate, useParams } from "react-router-dom";

import Reaction from "../components/Reaction";

import { useQuery } from "@apollo/client";
import { GET_USER, GET_ME } from "../utils/queries";
import Auth from "../utils/auth";

const Profile = (props) => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? GET_USER : GET_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div>
        <h2>Welcome {userParam ? `${user.username}` : "to your profile."}</h2>
      </div>

      <div>
        <div>
          <Reaction
            reactions={user.reactions}
            title={`${user.username}'s reactions...`}
          />
        </div>
      </div>
      <div>{!userParam && <Reaction />}</div>
    </div>
  );
};

export default Profile;
