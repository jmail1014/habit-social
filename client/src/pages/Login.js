

import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { Form,  Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import { Navigate, useParams } from 'react-router-dom';
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Login = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { username: userParam } = useParams();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

   
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      const { data } = await login({
        variables: { ...userFormData }
      });
    
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
      return <Navigate to="/profile"/>;
    }
    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

//   return (
//     <main className="flex-row justify-center mb-4">
//       <div className="col-12 col-lg">
//         <div className="card">
//           <h4 className="card-header">Login</h4>
//           <div className="card-body">
//             <form onSubmit={handleFormSubmit}>
//               <input
//                 className="form-input"
//                 placeholder="Your email"
//                 name="email"
//                 type="email"
//                 id="email"
//                 value={formState.email}
//                 onChange={handleChange}
//               />
//               <input
//                 className="form-input"
//                 placeholder="******"
//                 name="password"
//                 type="password"
//                 id="password"
//                 value={formState.password}
//                 onChange={handleChange}
//               />
//              <Button variant="dark">Submit</Button>{' '}
//             </form>

//             {error && <div>Login failed</div>}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
        <h4 className='title'>Login</h4>


          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled ={!(userFormData.email && userFormData.password)}
          type='submit'
          variant = "dark">
          Submit
        </Button>
        {error && <div>Login failed</div>}
      </Form>
    </>
  );
};

 export default Login;