import { NextPage } from 'next';

import { subPageTitle } from '@/helpers';
import { GenericPageLayout } from '@/layout/structure';
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
