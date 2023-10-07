import { NextPage } from 'next';
import Box from '@mui/material/Box';

import { subPageTitle } from '@/helpers';
import { GenericPageLayout } from '@/layout';

export const CommonPage: NextPage = () => {
  const pageTitle = 'Common Page';
  const title = subPageTitle(pageTitle);
  return (
    <GenericPageLayout title={title}>
      {/* TODO: Import common page with logon form */}
      <Box>CommonPage</Box>
    </GenericPageLayout>
  );
};
