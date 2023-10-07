import { NextPage } from 'next';

import * as siteConfig from '@/config/site';
import { subPageTitle } from '@/helpers';
import { GenericPageLayout } from '@/layout';
import { NotFoundSection } from '@/components';

export const NotFoundPage: NextPage = () => {
  const pageTitle = siteConfig.notFoundTitle;
  const title = subPageTitle(pageTitle);
  return (
    <GenericPageLayout title={title} pageContentProps={{ centered: true }}>
      <NotFoundSection />
    </GenericPageLayout>
  );
};
