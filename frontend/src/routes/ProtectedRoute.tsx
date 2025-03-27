import  { ReactNode, useContext } from 'react';
import {Navigate} from 'react-router-dom';
import { AuthContext } from '../context/authContext.tsx';

const ProtectedRoute = ({children}: {children: ReactNode}) => {
  const authContext = useContext(AuthContext);

  if (authContext?.isAuthenticated === null) {
    return null;
  }

  if(!authContext?.isAuthenticated) {
    console.log(123);
    return <Navigate to='/login'/>
  }

  return <>{children}</>
}

export default ProtectedRoute;