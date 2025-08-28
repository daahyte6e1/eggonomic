import { List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { Page } from '@/components/Page.tsx';
import { WalletBlock } from '@/components/WalletBlock/WalletBlock'
import { BalanceBlock } from '@/components/BalanceBlock/BalanceBlock';
import { MenuBlock } from '@/components/MenuBlock/MenuBlock';

import { ActivePositions } from '@/components/ActivePositions/ActivePositions';
import { AvailablePositions } from '@/components/AvailablePositions';

import './Home.css'

export const Home: FC = () => {
  return (
    <Page back={false}>
      <List className='home-page bg-ellipse-dual page'>
        <WalletBlock />
        <BalanceBlock />
        <MenuBlock />
        <ActivePositions />
        <AvailablePositions />
      </List>
    </Page>
  );
};
