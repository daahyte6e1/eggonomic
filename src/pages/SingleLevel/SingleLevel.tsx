import type { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { List } from '@telegram-apps/telegram-ui';

import { Page } from '@/components/Page.tsx';
import './SingleLevel.scss';
import {GradientCircle} from '@/components/GradientCircle';
import {LevelIndicator} from '@/components/LevelIndicator';
import {getLevelInfoByKey, createTransaction} from '@/helpers';
import { useUserContext } from '@/context/UserContext';
import { initDataRaw as _initDataRaw, useSignal } from '@telegram-apps/sdk-react';

import {TonCoin} from '@/components/Icons';

interface LevelInfo {
  level: number;
  backgroundColors: string[];
  gradientColors: string[];
  prices: {
    key: string;
    price: number;
    title: string;
  }[];
  numberText: string;
  textColor: string;
  isCircle: boolean;
  levelPageTitle: string;
  cardTitle: string;
  levelPageDescription: string;
}

export const SingleLevel: FC = () => {
  const { levelKey } = useParams();
  const [levelInformation, setLevelInformation] = useState<LevelInfo | null>(null)
  const { initializeUser } = useUserContext();
  const initDataRaw = useSignal(_initDataRaw);

  useEffect(() => {
    if (levelKey) {
      const levelInfo = getLevelInfoByKey(levelKey)
      if (levelInfo) setLevelInformation(levelInfo)
    }
  }, [levelKey])


  const createTransactionHandler = async (price: number, key: string) => {
    try {
      await createTransaction(price, key)
      
      if (initDataRaw) {
        await initializeUser(initDataRaw)
      }
    } catch (e) {
      console.error(e)
    }
  }
  if (!levelInformation || !levelInformation.prices) {
    return (
      <></>
    )
  }
  return (
    <Page back={true}>
      <List className='single-level-page column page'>

        <div className='column information-block'>
          {levelInformation.isCircle
            ? (
              <GradientCircle
                colors={levelInformation.gradientColors}
                size={100}
                text={levelInformation.numberText}
                textColor={levelInformation.textColor}
              />
            )
            : (
              <LevelIndicator
                colors={levelInformation.gradientColors}
                numberText={levelInformation.numberText}
                numberColor={levelInformation.textColor}
              />
            )
          }
          <span className='title'>{levelInformation.cardTitle}</span>
          <span className='description'>{levelInformation.levelPageDescription}</span>
        </div>
        <div className='level-list column'>
          {levelInformation.prices.map((price) => (
            <div
              onClick={() => createTransactionHandler(price.price, price.key)}
              key={price.key}
              className='card'
            >
              <span className='title'>{price.title}</span>
              <div className='price'>{price.price} <TonCoin /></div>
            </div>
          ))}
        </div>
      </List>
    </Page>
  );
};
