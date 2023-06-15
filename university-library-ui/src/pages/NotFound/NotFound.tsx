import React, {memo} from 'react';

import Layout from 'src/components/Layout';

function NotFound() {
  return (
    <Layout name="NotFound">
      <div>NotFound</div>
    </Layout>
  );
}
export default memo(NotFound);
