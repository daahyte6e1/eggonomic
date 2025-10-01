import { List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { Page } from '@/components/Page.tsx';
import { WalletBlock } from '@/components/WalletBlock/WalletBlock'
import { BalanceBlock } from '@/components/BalanceBlock/BalanceBlock';
import { MenuBlock } from '@/components/MenuBlock/MenuBlock';

import { ActivePositions } from '@/components/ActivePositions/ActivePositions';
import { AvailablePositions } from '@/components/AvailablePositions';
import { BackgroundShapes} from '@/components/BacgroudShapes';
import { CountdownTimer } from '@/components/CountdownTimer';
import './Home.css'
import {useUserContext} from '@/context/UserContext';
import {useEffect} from 'react';
import {useTonConnectUI, type ConnectedWallet} from "@tonconnect/ui-react";
import { APIManager } from '@/helpers/APIManager';

export const Home: FC = () => {
  const {userInfo, isLoading, backgroundColorByKey, isAuthenticated} = useUserContext()
  const [tonConnectUI] = useTonConnectUI();
  
  useEffect(() => {
    const handleWalletChange = (wallet: ConnectedWallet | null) => {
      if (!wallet) return

      const jsondata = JSON.stringify({ wallet_address: wallet.account.address })
      void APIManager.post('/eggs/api/save_wallet', jsondata, userInfo.key)
    }

    tonConnectUI.onStatusChange(handleWalletChange)
  }, [tonConnectUI, userInfo.key])

  // Проверяем, есть ли данные пользователя
  const hasUserData = isAuthenticated && userInfo.uid && userInfo.key;

  return (
    <Page back={false}>
      <List className='home-page page'>
        <BackgroundShapes className={isLoading ? 'loading' : ''} colors={backgroundColorByKey}/>
        <WalletBlock />
        {hasUserData ? (
          <>
            <BalanceBlock />
            <MenuBlock />
            <ActivePositions />
            <AvailablePositions />
          </>
        ) : (
          <CountdownTimer 
            targetDate="2025-10-11"
            targetTimeString="00:00:00"
            onComplete={() => {
              // Можно добавить логику при завершении таймера
            }}
          />
        )}
      </List>
    </Page>
  );
};
