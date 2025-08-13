import type { FC } from 'react';
import './BalanceBlock.scss'
import {Coin, Arrow} from "@/components/icons";

export const BalanceBlock: FC = () => {
  return (
    <div className="balance-content content column">
      <div className="title">
        Баланс
      </div>
      <div className="balance">
        10000
        <Coin height="25" width="24" />
      </div>
      <div className="card">
        Мои награды <Arrow />
      </div>
    </div>
  );
};


