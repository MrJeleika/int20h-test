import { memo, Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import Providers from './Providers';

import { PageLoader } from '@/components/page-loader/page-loader';
import { router } from '@/router';

export const LazyRouterProvider = memo(() => {
  return (
    <Suspense fallback={<PageLoader screen />}>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </Suspense>
  );
});
LazyRouterProvider.displayName = 'LazyRouterProvider';
