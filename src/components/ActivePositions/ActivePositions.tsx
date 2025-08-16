import type { FC } from 'react';
import './ActivePositions.scss'

import {GiftCard} from "@/components/GiftCard/GiftCard";
import { useUserContext } from '@/context/UserContext';

interface GiftData {
  collection: string;
  model: string;
  count: number;
  speed: number;
  factor: number;
  pic: string;
}

export const ActivePositions: FC = () => {
  const { userInfo, nftsData, isLoading, error, isAuthenticated } = useUserContext();

  // Трансформируем NFT данные в формат GiftData
  const giftsData: GiftData[] = nftsData.map(nft => ({
    collection: nft.name,
    model: nft.model,
    count: nft.count,
    speed: 24, // пока оставляем 24
    factor: 4, // пока оставляем 4
    pic: nft.pic,
  }));

  if (!isAuthenticated) {
    return (
      <div className="content position-content">
        <div className="card column">
          <span>Для просмотра активных позиций необходимо авторизоваться</span>
          <div>key: {userInfo.key}</div>
          <div>isAuthenticated: {isAuthenticated}</div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="content position-content">
        <div className="card column">
          <span>Загрузка активных позиций...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content position-content">
        <div className="card column">
          <span>Ошибка: {error}</span>
        </div>
      </div>
    );
  }

  if (giftsData.length === 0) {
    return (
      <div className="content position-content">
        <div className="card column">
          <span>У вас нет активных позиций</span>
        </div>
      </div>
    );
  }

  return (
    <div className="content position-content">
      <div className="card column">
        <span>Вы участвуете:</span>
        {giftsData.map((giftData, index) => (
          <GiftCard key={index} giftData={giftData} />
        ))}
      </div>
    </div>
  );
};


