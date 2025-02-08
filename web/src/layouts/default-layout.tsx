import { useAppKitAccount } from '@reown/appkit/react';
import { Suspense, memo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { PageLoader } from '@/components/page-loader/page-loader';
import { routes } from '@/router';

const DefaultLayout = memo(() => {
  const { status } = useAppKitAccount();

  return (
    <div className="font-quicksand relative">
      <Suspense fallback={<PageLoader screen />}>
        {status === 'connected' ? (
          <Outlet />
        ) : (
          <Navigate to={routes.login} replace />
        )}
      </Suspense>
    </div>
  );
});
DefaultLayout.displayName = 'DefaultLayout';

export default DefaultLayout;
