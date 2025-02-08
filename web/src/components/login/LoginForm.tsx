import { KeyRound, Loader2 } from 'lucide-react';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';

type LoginFormProps = {
  status:
    | 'reconnecting'
    | 'connected'
    | 'disconnected'
    | 'connecting'
    | undefined;
  onLogin: () => void;
};

const LoginForm = ({ status, onLogin }: LoginFormProps) => {
  const loginDisabled = useMemo(() => status !== 'disconnected', [status]);
  const loading = useMemo(
    () => status === 'connecting' || status === 'reconnecting',
    [status],
  );

  return (
    <div className={'flex flex-col gap-6'}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Login with your crypto-wallet
        </p>
      </div>
      <div className="grid gap-6">
        <Button disabled={loginDisabled} onClick={onLogin} className="w-full">
          {loading ? <Loader2 className="animate-spin" /> : <KeyRound />}
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
