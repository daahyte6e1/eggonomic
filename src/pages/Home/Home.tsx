import { Section, Cell, Image, List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { Page } from '@/components/Page.tsx';
import { WalletBlock } from '@/components/WalletBlock/WalletBlock'
import { BalanceBlock } from '@/components/BalanceBlock/BalanceBlock';
import { MenuBlock } from '@/components/MenuBlock/MenuBlock';

export const Home: FC = () => {
  return (
    <Page back={false}>
      <List>
        <WalletBlock />
        <BalanceBlock />
        <MenuBlock />
      </List>
    </Page>
  );
};
