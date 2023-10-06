import { NextPage } from 'next';

import { subPageTitle } from '@/helpers';
import { GenericPageLayout } from '@/layout';

export const UserPage: NextPage = () => {
  const pageTitle = 'User Page';
  const title = subPageTitle(pageTitle);
  return (
    <GenericPageLayout title={title}>
      {/* TODO: Import common page sith logon form */}
      UserPage
    </GenericPageLayout>
  );
};

