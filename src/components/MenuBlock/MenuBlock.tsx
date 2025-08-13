import type { FC } from 'react';
import './MenuBlock.scss'
import {Ranking, Referrals, Inventory} from '@/components/Icons'

export const MenuBlock: FC = () => {
  return (
    <div className="menu-content content row">
      <div className="card column">
        <Ranking />
        True Believer
      </div>
      <div className="card column">
        <Referrals />
        Referrals
      </div>
      <div className="card column">
        <Inventory />
        Inventory
      </div>
    </div>
  );
};


