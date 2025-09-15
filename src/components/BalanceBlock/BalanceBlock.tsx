import type { FC } from 'react';
import './BalanceBlock.scss'
import {Coin, Arrow} from '@/components/Icons';
import { useUserContext } from '@/context/UserContext.tsx';
import { formatNumber } from '@/helpers';

export const BalanceBlock: FC = () => {
  const {userPoints} = useUserContext()
  return (
    <div className='balance-content content column'>
      <div className='title'>
        Баланс
      </div>
      <div className='balance'>
        <span>{formatNumber(userPoints)}</span>
        <Coin height='25' width='24' />
      </div>
      <div className='card'>
        <span>Мои награды</span> <Arrow />
      </div>
    </div>
  );
};


