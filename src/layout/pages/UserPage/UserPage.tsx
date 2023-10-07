import { NextPage } from 'next';
import Box from '@mui/material/Box';

import { subPageTitle } from '@/helpers';
import { GenericPageLayout } from '@/layout';

export const UserPage: NextPage = () => {
  const pageTitle = 'User Page';
  const title = subPageTitle(pageTitle);
  return (
    <GenericPageLayout title={title} pageContentProps={{ centered: true }}>
      {/* TODO: Import common page sith logon form */}
      <Box>UserPage</Box>
    </GenericPageLayout>
  );
};
