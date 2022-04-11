import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import Button from "react-bootstrap/Button";

const Register = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg">
        <div className="card">
          <h4 className="card-header"> Register!</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Username"
                name="username"
                type="username"
                id="new_username"
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Email"
                name="email"
                type="email"
                id="new_email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="password"
                name="password"
                autoComplete="on"
                type="password"
                id="new_password"
                value={formState.password}
                onChange={handleChange}
              />
              <Button variant="dark">Submit</Button>{" "}
            </form>
            {error && <div>Signup Failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
