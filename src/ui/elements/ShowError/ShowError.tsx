import React from 'react';
import Typography from '@mui/material/Typography';
import classnames from 'classnames';

import { PropsWithClassName } from '@/core/types';
import { errorToString } from '@/helpers';

import styles from './ShowError.module.scss';

export const ShowError: React.FC<
  { title?: string; error?: Error | string } & PropsWithClassName
> = (props) => {
  const { title = 'Error', error, className } = props;
  const errorText = error ? errorToString(error) : undefined;
  return (
    <Typography className={classnames(className, styles.root)}>
      <span className={styles.title}>{title}:</span>{' '}
      <span className={styles.content}>{errorText}</span>
    </Typography>
  );
};
