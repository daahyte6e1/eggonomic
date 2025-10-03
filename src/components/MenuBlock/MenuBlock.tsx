import type { FC } from 'react';

import {useEffect, useState} from 'react';

import { Ranking, Referrals, Inventory } from '@/components/Icons'
import { Link } from '@/components/Link/Link.tsx'
import { useUserContext } from '@/context/UserContext'

import './MenuBlock.scss'
import {getLevelTitleByKey, getRankingGradientColorByKey} from '@/helpers/getLevelInfoByKey';
import {useTonConnectUI} from "@tonconnect/ui-react";

export const MenuBlock: FC<{isDemo?: boolean}> = ({isDemo = false}) => {
  const [tonConnectUI] = useTonConnectUI();
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

  useEffect(() => {
    // Загружаем скрипт виджета
    const script = document.createElement('script')
    script.src = `https://stars-swap.vercel.app/stars-swap-widget.umd.js?time=${Date.now()}`
    script.onload = () => {
      if (window.StarsSwapWidget) {
        window.StarsSwapWidget.init({
          partnerUid: 'A609ZNpIXFJdL'
        })
      }
    }
    document.head.appendChild(script)

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://stars-swap.vercel.app/stars-swap.css?time=${Date.now()}`
    document.head.appendChild(link)
  }, [])
  const openWidget = () => {
    if (window.StarsSwapWidget) {
      window.StarsSwapWidget.open({tonConnect: tonConnectUI});
    }
  };

  return (
    <div className='menu-content content row'>
      {isDemo
        ? (
          <div onClick={openWidget} className='card column pointer'>
            <Ranking color={rankingGradientColorByKey} />
            <span className='menu-text'>Try now</span>
          </div>
          )
        : (
          <>
            <Link to='/level' className='card column'>
              <Ranking color={rankingGradientColorByKey} />
              <span className='menu-text'>{levelTitle}</span>
            </Link>
            <Link to='/level' className='card column'>
              <Ranking color={rankingGradientColorByKey}/>
              <span className='menu-text'>{levelTitle}</span>
            </Link>
            <Link to='/referrals' className='card column'>
              <Referrals />
              <span className='menu-text'>Referrals</span>
            </Link>
          </>)}
      {userInfo.key && (
        <Link to='/inventory' className='card column'>
        <Inventory/>
        <span className='menu-text'>Inventory</span>
      </Link>)}
    </div>
  );
};


