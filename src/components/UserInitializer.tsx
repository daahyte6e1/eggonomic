import { useEffect } from 'react';
import { initDataRaw as _initDataRaw, useSignal } from '@telegram-apps/sdk-react';
import { useUserContext } from '@/context/UserContext.tsx';

interface UserInitializerProps {
  children: React.ReactNode;
}

export const UserInitializer: React.FC<UserInitializerProps> = ({ children }) => {
  const initDataRaw = useSignal(_initDataRaw);
  const { initializeUser } = useUserContext();

  useEffect(() => {
    if (initDataRaw) {
      void initializeUser(initDataRaw);
    }
  }, [initDataRaw, initializeUser]);

  return <>{children}</>;
};
