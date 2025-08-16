import type { FC } from 'react';
import './MenuBlock.scss'
import {Ranking, Referrals, Inventory} from '@/components/Icons'
import { Link } from '@/components/Link/Link.tsx';

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
      <Link to="/inventory" className="card column">
        <Inventory />
        Inventory
      </Link>
    </div>
  );
};


