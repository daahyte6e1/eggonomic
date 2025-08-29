import type { FC } from 'react';

import {useEffect, useState} from 'react';

import { Ranking, Referrals, Inventory } from '@/components/Icons'
import { Link } from '@/components/Link/Link.tsx'
import { useUserContext } from '@/context/UserContext'

import './MenuBlock.scss'
import {getLevelTitleByKey} from '@/helpers/getLevelInfoByKey';

export const MenuBlock: FC = () => {
  const {userInfo} = useUserContext()
  const [levelTitle, setLevelTitle] = useState<string>('')

  useEffect(() => {
    const levelTitle = getLevelTitleByKey(userInfo.level)
    if (levelTitle) {
      setLevelTitle(levelTitle)
    }
  }, [userInfo])
  return (
    <div className='menu-content content row'>
      <Link to='/level' className='card column'>
        <Ranking />
        {levelTitle}
      </Link>
      <Link to='/referrals' className='card column'>
        <Referrals />
        Referrals
      </Link>
      <Link to='/inventory' className='card column'>
        <Inventory />
        Inventory
      </Link>
    </div>
  );
};


