import { useRouter } from 'next/router';
import UserDetails from '../UserDetails';

const UserDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <UserDetails id={id} />;
};

export default UserDetailsPage;
