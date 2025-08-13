import { Section, Cell, Image, List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { Page } from '@/components/Page.tsx';
import { WalletBlock } from '@/components/WalletBlock/WalletBlock'
import {BalanceBlock} from "@/components/BalanceBlock/BalanceBlock";

export const Home: FC = () => {
  return (
    <Page back={false}>
      <List>
        <WalletBlock />
        <BalanceBlock />
      </List>
    </Page>
  );
};
