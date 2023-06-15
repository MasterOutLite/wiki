import React, {memo, ReactNode} from 'react';

import Header from './Header/Header';
import Content from './Content/Content';
import Footer from './Footer/Footer';

import styles from './Layout.module.scss';

export interface LayoutProps {
  children: ReactNode;
  className?: string;
  name: string;
}

function Layout({children, className, name}: LayoutProps) {
  return (
    <div className={styles.root}>
      <Header name={name} />
      <Content className={className}>{children}</Content>
      <Footer />
    </div>
  );
}

export default memo(Layout);
