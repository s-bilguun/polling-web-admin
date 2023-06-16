import { useRouter } from 'next/router';
import PollDetails from '../PollDetails';
import withAuth from './../withAuth';

const PollDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <PollDetails id={id} />;
};

export default withAuth(PollDetailsPage);
