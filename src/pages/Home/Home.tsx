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
// import { LevelIndicator} from "@/components/LevelIndicator";

export const Home: FC = () => {
  const initDataRaw = useSignal(_initDataRaw);
  const { initializeUser } = useUserContext();

  useEffect(() => {
    if (initDataRaw) {
      void initializeUser(initDataRaw);
    }
  }, [initDataRaw, initializeUser]);

  return (
    <Page back={false}>
      <List className='home-page bg-ellipse-dual'>
        <WalletBlock />
        <BalanceBlock />
        {/*<LevelIndicator*/}
        {/*  size={150}*/}
        {/*  colors={["#FF7700", "#D79447", "#D79447", "#AA6C2D", "#B95D00", "#D27D33"]}*/}
        {/*  numberColor="#ab4a29"*/}
        {/*  number={1}*/}
        {/*/>*/}
        <MenuBlock />
        <ActivePositions />
      </List>
    </Page>
  );
};
