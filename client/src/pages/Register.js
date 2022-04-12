import React, { useState } from 'react';

import { Form,  Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Register = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
 
    try {
      const { data } = await addUser({
       variables: { ...userFormData }
      });
    console.log(data);
   
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
        <h4 className='title'>Register</h4>

          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type="submit"
          variant="dark">
          Submit
        </Button>
         {error && <div>Sign up failed</div>}
      </Form>
    </>
  );
};

// return (
//     <main className="flex-row justify-center mb-4">
//         <div className="col-12 col-lg" >
//             <div className="card">
//                 <h4 className="card-header"> Register!</h4>
//                 <div className='card-body'>
//                     <form onSubmit={handleFormSubmit}>
//                         <input
//                         className='form-input'
//                         placeholder='Username'
//                         name='username'
//                         type='username'
//                         id='username'
//                         value={formState.username}
//                         onChange={handleChange}
//                         />
//                         <input
//                         className='form-input'
//                         placeholder='Email'
//                         name='email'
//                         type='email'
//                         id='email'
//                         value={formState.email}
//                         onChange={handleChange}
//                         />
//                         <input
//                         className='form-input'
//                         placeholder='password'
//                         name='password'
//                         type='password'
//                         id='password'
//                         value={formState.password}
//                         onChange={handleChange}
//                         />
//                         <Button variant="dark">Submit</Button>{' '}
//                     </form>
//                     {error && <div>Signup Failed</div>}
//                 </div>
//             </div>
//         </div>
//     </main>
//     );
// };

export default Register;