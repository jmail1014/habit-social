
import React from "react";
//import { Navigate, useParams } from "react-router-dom";
import {  useParams } from "react-router-dom";
//
import CommentList from "../components/CommentList";
import Comments from "../components/Comments";
// import Habit from "../components/Habits";
// import CurrentHabits from "../components/CurrentHabits";

import { useQuery } from "@apollo/client";
import { GET_USER, GET_ME } from "../utils/queries";

//import Auth from "../utils/auth";

const Profile = (props) => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? GET_USER : GET_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  console.log(user);

  // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //   return <Navigate to="/profile" />;
  // }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see your profile. Use the forms
        above to sign up or log in!
      </h4>
    );
  }
  return (
    <div>
    <div className="flex-row mb-3">
  <h2>Welcome {user.username} to your profile</h2>
</div>

      <div className="flex-row justify-space-between mb-3">
     <div className="mb-3">{!userParam && <Comments />}</div>
    </div>   
  <div className="col-12 mb-3 col-lg-8">
    <CommentList comments={user.comments} title={`${user.username}'s thoughts...`} />
  </div>
</div>
  );
};

export default Profile;