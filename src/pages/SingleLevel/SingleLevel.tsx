import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { beginCell } from '@ton/core';

import { useEffect, useState } from 'react';
import { List } from '@telegram-apps/telegram-ui';

import { Page } from '@/components/Page.tsx';
import './SingleLevel.scss';
import {GradientCircle} from '@/components/GradientCircle';
import {LevelIndicator} from '@/components/LevelIndicator';
import {getLevelInfoByKey} from '@/helpers';
import { useTonConnectUI, SendTransactionRequest } from '@tonconnect/ui-react';

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

  useEffect(() => {
    if (levelKey) {
      const levelInfo = getLevelInfoByKey(levelKey)
      if (levelInfo) setLevelInformation(levelInfo)
    }
  }, [levelKey])

  const [tonConnectUI] = useTonConnectUI();

  async function createTransaction(amount: number, memo: string): Promise<void> {

    const cell = beginCell()
      .storeUint(0, 32)
      .storeStringTail(memo)
      .endCell();

    const boc = cell.toBoc({ idx: false });
    const payload = btoa(String.fromCharCode(...boc));

    const transaction: SendTransactionRequest = {
      validUntil: Math.floor(Date.now() / 1000) + 60,
      network: -3 as any, //todo need delete
      messages: [
        {
          address: 'UQAc2HeqsF1fQaoMPueedr5aIByh2PUCMbtrH3nbctOBFtXk',
          amount: Math.round(amount * 1e9).toString(),
          payload: payload
        }
      ]
    };

    const result = await tonConnectUI.sendTransaction(transaction);
    console.log(result)
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
              onClick={() => createTransaction(price.price, price.key)}
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
