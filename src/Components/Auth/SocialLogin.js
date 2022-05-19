import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import auth from '../../Firebase/Firebase.init';
import useToken from '../../Hooks/useToken';


const SocialLogin = () => {
    const navigate = useNavigate();
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [token] = useToken(user)
    if (token) {
        toast.success('Successfully login', {id: 'success'})
            navigate('/')
      }
    if (error) {
        toast.error(error.message, {id: 'err'})
      }
    if (loading) {
        return   <button className="btn loading">loading</button>
      }
    return (
        <>
            <button onClick={() => signInWithGoogle()} className="btn btn-outline btn-accent w-full max-w-xs mt-3">Continue With google</button>
        </>
    );
};

export default SocialLogin;