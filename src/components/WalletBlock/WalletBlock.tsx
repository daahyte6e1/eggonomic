import type { FC } from 'react';
import {TonConnectButton} from '@tonconnect/ui-react';
import './WalletBlock.scss'

import {Coin} from '@/components/Icons'

export const WalletBlock: FC = () => {
  return (
    <div className='wallet-content content'>
      <div className='card row'>
        <div className='row wallet-info'>
          <Coin />
          <span className='wallet'>Wallet</span>
        </div>

        <div className='wallet-connect'>
          <TonConnectButton />
        </div>
      </div>
    </div>
  );
};


