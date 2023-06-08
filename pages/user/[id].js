import { useRouter } from 'next/router';
import UserDetails from '../UserDetails';
import withAuth from './../withAuth';

const UserDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <UserDetails id={id} />;
};

export default withAuth(UserDetailsPage);
