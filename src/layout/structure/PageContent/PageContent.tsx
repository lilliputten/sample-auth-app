/** @module PageContent
 *  @since 2023.02.21, 00:56
 *  @changed 2023.02.21, 00:56
 */

import React from 'react';
import classnames from 'classnames';

import { Panel } from '@/layout/structure/Panel';

import styles from './PageContent.module.scss';

export interface TPageContentProps {
  className?: string;
  children?: React.ReactNode;
  centered?: boolean;
  stretched?: boolean;
}

export function PageContent(props: TPageContentProps): JSX.Element {
  const { children, className, centered, stretched } = props;
  const wrapperClassName = classnames(
    styles.wrapper,
    centered && styles.wrapperCentered,
    stretched && styles.wrapperStretched,
  );
  return (
    <Panel
      className={classnames(className, styles.container)}
      wrapperClassName={wrapperClassName}
      tag="section"
      padded
      flex
      flexVertical
    >
      {children}
    </Panel>
  );
}
