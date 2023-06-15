import React, {memo} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import Login from 'src/pages/Login';
import Dashboard from 'src/pages/Dashboard';
import ArticlesList from 'src/pages/ArticlesList';
import ArticlesItem from 'src/pages/ArticlesItem';
import NotFound from 'src/pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/articles',
    element: <ArticlesList />,
  },
  {
    path: '/articles/:articleId',
    element: <ArticlesItem />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

function Routes() {
  return <RouterProvider router={router} />;
}
export default memo(Routes);
