import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../Firebase/Firebase.init';
import useAdmin from '../../Hooks/useAdmin';
import Spinner from '../Shared/Spinner';
import { signOut } from 'firebase/auth';

const RequireAdmin = ({ children }) => {
    let location = useLocation();

    const [user, loading] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user);

    if (loading || adminLoading) {
      return (
        <Spinner/>
      )
      }

    if (!user || !admin) {
        signOut(auth)
        return <Navigate to="/login" state={{ from: location }} replace />;
      }
    
    return children
};

export default RequireAdmin;