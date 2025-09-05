import { List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { Page } from '@/components/Page.tsx';
import { WalletBlock } from '@/components/WalletBlock/WalletBlock'
import { BalanceBlock } from '@/components/BalanceBlock/BalanceBlock';
import { MenuBlock } from '@/components/MenuBlock/MenuBlock';

import { ActivePositions } from '@/components/ActivePositions/ActivePositions';
import { AvailablePositions } from '@/components/AvailablePositions';
import { BackgroundShapes} from '@/components/BacgroudShapes';
import './Home.css'
import {useUserContext} from '@/context/UserContext';
import {useEffect, useState} from 'react';
import {getPageBackgroundColorByKey} from '@/helpers/getLevelInfoByKey';

export const Home: FC = () => {
  const {userInfo} = useUserContext()
  const [backgroundColorByKey, setBackgroundColorByKey] = useState<string[]>([])

  useEffect(() => {
    if (!userInfo.level) return

    const backgroundColorByKey = getPageBackgroundColorByKey(userInfo.level)
    setBackgroundColorByKey(backgroundColorByKey)
  }, [userInfo.level])
  return (
    <Page back={false}>
      <List className='home-page page'>
        <BackgroundShapes
          colors={backgroundColorByKey}
          style={{
        }} />
        <WalletBlock />
        <BalanceBlock />
        <MenuBlock />
        <ActivePositions />
        <AvailablePositions />
      </List>
    </Page>
  );
};
