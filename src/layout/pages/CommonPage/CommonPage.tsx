import { NextPage } from 'next';
import Box from '@mui/material/Box';

import { subPageTitle } from '@/helpers';
import { GenericPageLayout } from '@/layout';
import { LoginForm } from '@/components';

export const CommonPage: NextPage = () => {
  const pageTitle = 'Common Page';
  const title = subPageTitle(pageTitle);
  return (
    <GenericPageLayout title={title} pageContentProps={{ centered: true }}>
      <LoginForm />
    </GenericPageLayout>
  );
};
