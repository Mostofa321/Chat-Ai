import { updateProfile } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, AuthContext } from '../../contexts/UserContexts';

const SignUp = () => {
    const navigate = useNavigate()
    const { signUp } = useContext(AuthContext);
    const [errMessage, setErrMessage] = useState(null);
    const [successMessage, setSuccesMeassage] = useState(null);
  
    // ****create a new user ***** 
    const createUser = (e) => {
        // geting form inputs value and satting to use state
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value
        const password = form.password.value;
        // Creating User
        signUp(email, password)
            .then(result => {
                setSuccesMeassage('user created succesfuly');
                updateUserProfile(name)
                form.reset();
                
                navigate('/')
            })
            .catch(err => {
                const errorMessage = err.message;
                setErrMessage(errorMessage);
            });

    };

    // update user info 
    const updateUserProfile = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
            .then(() => {
                console.log("updated")
            })
            .catch(err => console.log(err))
    };
    

    return (
        <div className='pt-5 container flex mx-auto my-10'>
            <form onSubmit={createUser} className='mx-auto p-5 w-11/12 md:w-5/12 mt-24' style={{ boxShadow: "rgba(240, 46, 170, 0.4) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px, rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px" }}>
                <h2 className='mb-4'>Sign Up</h2>
                <div className="mb-3">
                    <input type="text" name='name' className="input input-bordered w-full" placeholder='Full name' required />
                </div>
                <div className="mb-3">
                    <input type="email" name='email' className="input input-bordered w-full" placeholder='Email' required />
                </div>
                <div className="mb-3">
                    <input type="password" name='password' className="input input-bordered w-full" placeholder='Password' required />
                </div>
                {
                    successMessage ? <p className='text-success'>{successMessage}</p> : <p className='text-danger'>{errMessage}</p>
                }
                <button type="submit" className="btn btn-primary w-full">Sign Up</button>
                <p className='mt-5'><small className='mr-3'>Already have an account?</small><Link to='/login'>Sign In</Link></p>
            </form>
        </div>
    );
};

export default SignUp;