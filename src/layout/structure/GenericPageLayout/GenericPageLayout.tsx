import * as React from 'react';
import classnames from 'classnames';
import { Typography } from '@mui/material';

import { WithToastsWrapper } from '@/ui';
import { HtmlHeader, THtmlHeaderProps } from '@/layout/structure/HtmlHeader';
import { PageContent, TPageContentProps } from '@/layout/structure/PageContent';

import styles from './GenericPageLayout.module.scss';

export interface TGenericPageLayoutProps extends THtmlHeaderProps {
  className?: string;
  children?: React.ReactNode;
  pageContentProps?: TPageContentProps;
}

export function GenericPageLayout(props: TGenericPageLayoutProps): JSX.Element {
  // NOTE: Get props from nextjs (as `pageProps`)
  const { className, children, pageContentProps, ...restProps } = props;
  return (
    <>
      {/* Pass page parameters: title etc */}
      <HtmlHeader {...restProps} />
      {/* Theme root for app-through typograpy support */}
      <Typography className={classnames(className, styles.container)} component="article">
        {/* Toasts support */}
        <WithToastsWrapper>
          {/* Other app layout elements should came here */}
          <PageContent className={styles.content} {...pageContentProps}>
            {children}
          </PageContent>
        </WithToastsWrapper>
      </Typography>
    </>
  );
}
