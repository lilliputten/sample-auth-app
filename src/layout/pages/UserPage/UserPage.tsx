import { NextPage } from 'next';

import { subPageTitle } from '@/helpers';
import { GenericPageLayout } from '@/layout/structure';
import { UserForm } from '@/components/UserForm';

export const UserPage: NextPage = () => {
  const pageTitle = 'User Page';
  const title = subPageTitle(pageTitle);
  return (
    <GenericPageLayout title={title} pageContentProps={{ centered: true }}>
      <UserForm />
    </GenericPageLayout>
  );
};
