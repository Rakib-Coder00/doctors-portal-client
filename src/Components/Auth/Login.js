import React, { useRef, useState } from 'react';
import auth from '../../Firebase/Firebase.init';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import SocialLogin from './SocialLogin';
import { useForm } from "react-hook-form";
import Spinner from '../Shared/Spinner';
import useToken from '../../Hooks/useToken';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const emailRef = useRef('');
  let from = location.state?.from?.pathname || "/";

  // const [email, setEmail] = useState({ value: '', error: '' });
  // const [password, setPassword] = useState({ value: '', error: '' });

  const { register, formState: { errors }, handleSubmit } = useForm();

  const onSubmit = data => {
    signInWithEmailAndPassword(data.email, data.password)
    console.log(data);
  }


  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);

  const [token] = useToken(user)

  if (token) {
    toast.success('Successfully login', { id: 'success' })
    navigate(from, { replace: true })
  }
  if (error) {
    toast.error(error.message, { id: 'error' })

  }
  if (loading) {
    return  <Spinner/>
  }

  const resetPassword = async (e)=>{
    const email = 
    console.log(email)
    if (email) {
      // await sendPasswordResetEmail(email)
      toast.success('Sent email', {"1d": 'success'} )
    }
    else{
      toast.error('Please enter your email', {"1d": 'error'})
    }
  }


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center font-bold text-2xl">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input {...register("email", {
                required: {
                  value: true,
                  message: "Email is required"
                },
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Email must be valid"
                }
              })} type="email" placeholder="Your Email" name='email' className="input input-bordered w-full max-w-xs"  />
              <label className="label">
                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}

              </label>

              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input {...register("password", {
                required: {
                  value: true,
                  message: "Password is required"
                },
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters or longer'
                }
              }
              )} type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />
              <label className="label">
                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
              </label>
            </div>

            <input type="submit" value='Log in' className="btn btn-outline btn-accent w-full max-w-xs mt-3" />
          </form>
          <small>New to Doctor Portal?<Link className='text-primary' to='/signup'>Create an Account</Link></small>
          <small>Forget Password?{" "}<span className='text-primary cursor-pointer' onClick={resetPassword}>Reset Password</span></small>
          <div className="divider">OR</div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;