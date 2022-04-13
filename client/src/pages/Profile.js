import React from "react";
import { useParams } from "react-router-dom";

// Navigate,

import Reaction from "../components/Reaction";
// import Habit from "../components/Habits";
// import CurrentHabits from "../components/CurrentHabits";

import { useQuery } from "@apollo/client";
import { GET_USER, GET_ME } from "../utils/queries";
//import Auth from "../utils/auth";

const Profile = ( props) => {

  const { username: userParam } = useParams();

  const { data } = useQuery(userParam ? GET_USER : GET_ME, {
    variables: { username: userParam },
  });
  
  const user = data?.me || data?.user || {};
  console.log(user);

  // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //   return <Navigate to="/profile" />;
  // }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!user?.username) {
  //   return (
  //     <h4>
  //       You need to be logged in to see this. Use the navigation links above to
  //       sign up or log in!
  //     </h4>
  //   );
  // }

  return (
    <div>
      <div>
        <h2>Welcome {userParam ? `${user.username}'s` : "to your profile."}</h2>
      </div>

      <div>
        <div>
          {/* <Habit /> */}
        </div>
        <div>
          {/* <CurrentHabits /> */}
        </div>
        <div>
          <Reaction
            // reactions={user.reactions}
            // title={`${user.username}'s reactions...`}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Profile;
