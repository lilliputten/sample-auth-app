import { NextPage } from 'next';

import { UserPage } from '@/layout';
import { withAuth } from '@/helpers';

const Page: NextPage = () => {
  return <UserPage />;
};

export default withAuth(Page);
