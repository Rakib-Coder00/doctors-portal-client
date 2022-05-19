import React, { useEffect } from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../Firebase/Firebase.init';
import useToken from '../../Hooks/useToken';
import Spinner from '../Shared/Spinner';
import SocialLogin from './SocialLogin';

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation()
  let from = location.state?.from?.pathname || "/";

  const [createUserWithEmailAndPassword, user, loading, error,] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);



  const { register, formState: { errors }, handleSubmit } = useForm();


  const [token] = useToken(user)


  const onSubmit = async data => {
    await createUserWithEmailAndPassword(data.email, data.password)
    await updateProfile({ displayName : data.name})
    console.log(data);
  }


  useEffect(() => {
    if (token) {
      // console.log(user);
      toast.success('Successfully login', { id: 'success' })
      navigate(from, { replace: true })
    }
  }, [token, from, navigate])
  
  if (error) {
    toast.error(error.message, { id: 'error' })

  }
  if (loading) {
    return <Spinner />
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center font-bold text-2xl">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-control w-full max-w-xs">


              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input {...register("name", {
                required: {
                  value: true,
                  message: "Name is required"
                }
              })} type="text" placeholder="Your Name" className="input input-bordered w-full max-w-xs" />
              <label className="label">
                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}

              </label>



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
              })} type="email" placeholder="Your Email" className="input input-bordered w-full max-w-xs" />
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

            <input type="submit" value='Sign Up' className="btn btn-outline btn-accent w-full max-w-xs mt-3" />
          </form>
          <small>Already have an account?<Link className='text-primary' to='/login'>Log in</Link></small>
          <div className="divider">OR</div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Signup;