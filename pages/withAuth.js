import { useRouter } from 'next/router';
import { useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const { user, checkAuth } = useContext(AuthContext); // Access the user object from AuthContext

    useEffect(() => {
      const isLoggedIn = !!user && !!user.token;
    
      if (!isLoggedIn) {
        const checkAndRedirect = async () => {
          try {
            const updatedUser = await checkAuth(); // Get the updated user object
            const isLoggedInAfterCheck = !!updatedUser && !!updatedUser.token;
            if (!isLoggedInAfterCheck) {
              router.push('/login');
            }
          } catch (error) {
            console.log('Authentication error:', error);
            router.push('/login');
          }
        };
        checkAndRedirect();
      }
    }, [user, router, checkAuth]);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
