import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      // Check if user is logged in and has admin role
      // Replace this with your actual authentication check
      const isLoggedIn = true; // Example: Assuming user is logged in
      const isAdmin = true; // Example: Assuming user has admin role

      if (!isLoggedIn || !isAdmin) {
        // Redirect to login page if user is not logged in or not an admin
        router.push('/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
