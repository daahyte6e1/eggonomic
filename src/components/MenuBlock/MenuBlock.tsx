import type { FC } from 'react';

import {useEffect, useState} from 'react';

import { Ranking, Referrals, Inventory } from '@/components/Icons'
import { Link } from '@/components/Link/Link.tsx'
import { useUserContext } from '@/context/UserContext'

import './MenuBlock.scss'
import {getLevelTitleByKey, getRankingGradientColorByKey} from '@/helpers/getLevelInfoByKey';

export const MenuBlock: FC = () => {
  const {userInfo} = useUserContext()
  const [levelTitle, setLevelTitle] = useState<string>('')
  const [rankingGradientColorByKey, setRankingGradientColorByKey] = useState<string>('')

  useEffect(() => {
    if (!userInfo.level) return

    const levelTitle = getLevelTitleByKey(userInfo.level)
    if (levelTitle) {
      setLevelTitle(levelTitle)
    }
    const rankingGradientColorByKey = getRankingGradientColorByKey(userInfo.level)
    if (levelTitle) {
      setRankingGradientColorByKey(rankingGradientColorByKey)
    }
  }, [userInfo])
  return (
    <div className='menu-content content row'>
      <Link to='/level' className='card column'>
        <Ranking color={rankingGradientColorByKey} />
        <span className='menu-text'>{levelTitle}</span>
      </Link>
      <Link to='/referrals' className='card column'>
        <Referrals />
        <span className='menu-text'>Referrals</span>
      </Link>
      <Link to='/inventory' className='card column'>
        <Inventory />
        <span className='menu-text'>Inventory</span>
      </Link>
    </div>
  );
};


