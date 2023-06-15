import React, {memo, ReactNode} from 'react';
import clsx from 'clsx';

import styles from './Content.module.scss';

export interface ContentProps {
  children: ReactNode;
  className?: string;
}

function Content({children, className}: ContentProps) {
  return (
    <div className={styles.root}>
      <div className={clsx(styles.wrapper, className)}>{children}</div>
    </div>
  );
}

export default memo(Content);
