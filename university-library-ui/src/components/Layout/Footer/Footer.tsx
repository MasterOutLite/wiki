import React, {memo} from 'react';

import styles from './Footer.module.scss';

function Footer() {
  return <footer className={styles.root}>ЧДТУ, ПЗС2244</footer>;
}

export default memo(Footer);
