import React, {useState, memo, useEffect, ReactNode} from 'react';

export interface AppProps {
  children: ReactNode;
}

function App({children}: AppProps) {
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}

export default memo(App);
