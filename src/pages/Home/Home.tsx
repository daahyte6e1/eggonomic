import { List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import { useEffect } from 'react';
import {
  initDataRaw as _initDataRaw,
  useSignal,
} from '@telegram-apps/sdk-react';

import { Page } from '@/components/Page.tsx';
import { WalletBlock } from '@/components/WalletBlock/WalletBlock'
import { BalanceBlock } from '@/components/BalanceBlock/BalanceBlock';
import { MenuBlock } from '@/components/MenuBlock/MenuBlock';

import { ActivePositions } from "@/components/ActivePositions/ActivePositions";
import { useUserContext } from '@/context/UserContext.tsx';

export const Home: FC = () => {
  const initDataRaw = useSignal(_initDataRaw);
  const { initializeUser } = useUserContext();

  useEffect(() => {
    if (initDataRaw) {
      initializeUser(initDataRaw);
    }
  }, [initDataRaw]);

  return (
    <Page back={false}>
      <List>
        <WalletBlock />
        <BalanceBlock />
        <MenuBlock />
        <ActivePositions />
      </List>
    </Page>
  );
};
