/** @module Panel
 *  @since 2023.02.21, 00:56
 *  @changed 2023.02.21, 00:56
 *  TODO: Use MUI layout components?
 */

import React from 'react';
import classnames from 'classnames';

import styles from './Panel.module.scss';

interface TPanelProps {
  tag?: string;
  className?: string;
  wrapperClassName?: string;
  children?: React.ReactNode;
  flex?: boolean;
  flexVertical?: boolean;
  padded?: boolean;
}

export function Panel(props: TPanelProps): JSX.Element {
  const { tag = 'div', className, wrapperClassName, children, flex, flexVertical, padded } = props;
  const renderProps = {
    className: classnames(className, styles.container, padded && styles.padded),
  };
  const contentClassName = classnames(
    wrapperClassName,
    styles.wrapper,
    flex && styles.flex,
    flexVertical && styles.flexVertical,
  );
  // prettier-ignore
  const renderContent = (
    <div className={contentClassName}>
      {children}
    </div>
  );
  return React.createElement(tag, renderProps, renderContent);
}
