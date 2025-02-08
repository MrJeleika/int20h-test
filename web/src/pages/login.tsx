import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { GalleryVerticalEnd } from 'lucide-react';
import { Navigate } from 'react-router-dom';

import LoginForm from '../components/login/LoginForm';

import { routes } from '@/router';

const LoginPage = () => {
  const { status } = useAppKitAccount();
  const { open } = useAppKit();

  return status === 'connected' ? (
    <Navigate to={routes.root} />
  ) : (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm status={status} onLogin={() => open()} />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/images/bugrov.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default LoginPage;
