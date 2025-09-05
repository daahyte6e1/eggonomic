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
import {useTonConnectUI, type ConnectedWallet} from "@tonconnect/ui-react";
import { APIManager } from '@/helpers/APIManager';

export const Home: FC = () => {
  const {userInfo, isLoading} = useUserContext()
  const [tonConnectUI] = useTonConnectUI();
  
  useEffect(() => {
    const handleWalletChange = (wallet: ConnectedWallet | null) => {
      if (!wallet) return

      const jsondata = JSON.stringify({ wallet_address: wallet.account.address })
      void APIManager.post('/eggs/api/save_wallet', jsondata, userInfo.key)
    }

    tonConnectUI.onStatusChange(handleWalletChange)
  }, [tonConnectUI, userInfo.key])

  const [backgroundColorByKey, setBackgroundColorByKey] = useState<string[]>([])

  useEffect(() => {
    if (!userInfo.level) return

    const backgroundColorByKey = getPageBackgroundColorByKey(userInfo.level)
    setBackgroundColorByKey(backgroundColorByKey)
  }, [userInfo.level])
  return (
    <Page back={false}>
      <List className='home-page page'>
        <BackgroundShapes className={isLoading ? 'loading' : ''} colors={backgroundColorByKey}/>
        <WalletBlock />
        <BalanceBlock />
        <MenuBlock />
        <ActivePositions />
        <AvailablePositions />
      </List>
    </Page>
  );
};
