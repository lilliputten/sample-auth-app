import { NextPage } from 'next';
import { useUser } from '@auth0/nextjs-auth0/client';

import { subPageTitle } from '@/helpers';
import { GenericPageLayout } from '@/layout/structure';
import { LoginForm } from '@/components';

export const CommonPage: NextPage = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const pageTitle = 'Common Page';
  const title = subPageTitle(pageTitle);
  return (
    <GenericPageLayout title={title} pageContentProps={{ centered: true }}>
      <div>Auth0 user: {user?.name}</div>
      <LoginForm />
    </GenericPageLayout>
  );
};
