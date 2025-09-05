import type { FC } from 'react';
import './ActivePositions.scss'

import {GiftCard} from '@/components/GiftCard/GiftCard';
import { useUserContext } from '@/context/UserContext';
import {getLevelInfoByKey} from '@/helpers';

interface GiftData {
  collection: string;
  model: string;
  count: number;
  speed: number;
  multiplier: number;
  pic: string;
}

export const ActivePositions: FC = () => {
  const { userInfo, nftsData, isLoading, error, isAuthenticated, availableNFTs } = useUserContext();

  const levelInfo = getLevelInfoByKey(userInfo.level)

  const giftsData: GiftData[] = nftsData.reduce((acc: GiftData[], nft) => {
    if (!nft.count) return acc

    const speedInfo = availableNFTs.find(el => el.id === nft.gift_id)
    acc.push({
      collection: nft.name,
      model: nft.model,
      count: nft.count,
      speed: speedInfo ? (24 / speedInfo['1_point_per_hours']) : 0,
      multiplier: levelInfo?.multiplier || 1,
      pic: nft.pic,
    })
    return acc
  }, [] as GiftData[])

  if (!isAuthenticated) {
    return (
      <div className='content position-content'>
        <div className='card column'>
          <span>Для просмотра активных позиций необходимо авторизоваться</span>
          <div>key: {userInfo.key}</div>
          <div>isAuthenticated: {isAuthenticated}</div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='content position-content'>
        <div className='card column'>
          <span>Загрузка активных позиций...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='content position-content'>
        <div className='card column'>
          <span>Ошибка: {error}</span>
        </div>
      </div>
    );
  }

  if (giftsData.length === 0) {
    return (
      <div className='content position-content'>
        <div className='card column'>
          <span>У вас нет активных позиций</span>
        </div>
      </div>
    );
  }

  return (
    <div className='content position-content'>
      <div className='card column'>
        <span className='position-title'>Вы участвуете:</span>
        {giftsData.map((giftData, index) => (
          <GiftCard key={index} giftData={giftData} />
        ))}
      </div>
    </div>
  );
};


