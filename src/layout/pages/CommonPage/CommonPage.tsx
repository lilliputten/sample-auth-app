import { NextPage } from 'next';

import { subPageTitle } from '@/helpers';
import { GenericPageLayout } from '@/layout';

export const CommonPage: NextPage = () => {
  const pageTitle = 'Common Page';
  const title = subPageTitle(pageTitle);
  return (
    <GenericPageLayout title={title}>
      {/* TODO: Import common page sith logon form */}
      CommonPage
    </GenericPageLayout>
  );
};
