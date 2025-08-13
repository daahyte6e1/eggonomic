import type { FC } from 'react';
import {TonConnectButton, TonConnectUIProvider} from '@tonconnect/ui-react';
import './WalletBlock.scss'

import {Coin} from '@/components/Icons'

export const WalletBlock: FC = () => {
  return (
    <div className="wallet-content content">
      <div className="card row">
        <div className="row wallet-info">
          <Coin />
          <span className="wallet">Кошелек</span>
        </div>

        <TonConnectUIProvider
          manifestUrl='https://thekeeper.tech/eggs/api/tonconnect-manifest.json'
        >
          <div className="wallet-connect">
            <TonConnectButton />
          </div>
        </TonConnectUIProvider>
      </div>
    </div>
  );
};


