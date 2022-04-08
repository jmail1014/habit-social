import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Register = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
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
    <main>
        <div>
            <div>
                <h4> Register!</h4>
                <div>
                    <form onSubmit={handleFormSubmit}>
                        <input
                        className='form-input'
                        placeholder='Username'
                        name='username'
                        type='username'
                        id='username'
                        value={formState.username}
                        onChange={handleChange}
                        />
                        <input
                        className='form-input'
                        placeholder='Email'
                        name='email'
                        type='email'
                        id='email'
                        value={formState.email}
                        onChange={handleChange}
                        />
                        <input
                        className='form-input'
                        placeholder='password'
                        name='password'
                        type='password'
                        id='password'
                        value={formState.password}
                        onChange={handleChange}
                        />
                        <button className='btn' type='submit'>
                            Submit
                        </button>
                    </form>
                    {error && <div>Signup Failed</div>}
                </div>
            </div>
        </div>
    </main>
    );
};

export default Register;