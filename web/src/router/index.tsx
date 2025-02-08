import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function lazyWithRetry(dynamicImportFn: () => any) {
  return lazy(() =>
    dynamicImportFn().catch(() => {
      window.location.reload();
    }),
  );
}

export const routes = {
  root: '/',
  login: '/login',
  project: '/project',
} as const;

export const router = createBrowserRouter([
  {
    path: routes.login,
    Component: lazyWithRetry(() => import('@/pages/login')),
  },
  {
    path: routes.root,
    Component: lazyWithRetry(() => import('@/layouts/default-layout')),
    children: [
      {
        path: routes.root,
        Component: lazyWithRetry(() => import('@/pages/home')),
      },
      {
        path: `${routes.project}/:id/:page?`,
        Component: lazyWithRetry(() => import('@/pages/project')),
      },
      {
        path: '*',
        element: <Navigate to={routes.root} />,
      },
    ],
  },
]);
