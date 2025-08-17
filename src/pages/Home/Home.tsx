import { List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { Page } from '@/components/Page.tsx';
import { WalletBlock } from '@/components/WalletBlock/WalletBlock'
import { BalanceBlock } from '@/components/BalanceBlock/BalanceBlock';
import { MenuBlock } from '@/components/MenuBlock/MenuBlock';

import { ActivePositions } from "@/components/ActivePositions/ActivePositions";
import { LevelIndicator} from "@/components/LevelIndicator";

export const Home: FC = () => {
  return (
    <Page back={false}>
      <List className='home-page bg-ellipse-dual'>
        <WalletBlock />
        <BalanceBlock />
        {/*<LevelIndicator*/}
        {/*  size={150}*/}
        {/*  colors={["#FFFF4A", "#FFDE59", "#FF9D00", "#E5D411", "#DEB200", "#C99B02"]}*/}
        {/*  numberColor="#ba8832"*/}
        {/*  number={1}*/}
        {/*/>*/}
        <MenuBlock />
        <ActivePositions />
      </List>
    </Page>
  );
};
