import type { FC } from 'react';
import './AvailablePositions.scss'

import { GiftCard } from "@/components/GiftCard/GiftCard";
import { useUserContext } from '@/context/UserContext';
import { getLevelInfoByKey } from "@/helpers";

interface GiftData {
  collection: string;
  model: string;
  count?: number;
  speed: number;
  multiplier: number;
  pic: string;
}

export const AvailablePositions: FC = () => {
  const { userInfo, availableNFTs, isLoading, error, isAuthenticated } = useUserContext();

  const levelInfo = getLevelInfoByKey(userInfo.level);

  const giftsData: GiftData[] = availableNFTs
    .map(nft => ({
      collection: nft.name,
      model: nft.model,
      speed: nft["1_point_per_hours"],
      multiplier: levelInfo?.multiplier || 1,
      pic: nft.pic,
    }));

  if (!isAuthenticated) {
    return (
      <div className="content position-content">
        <div className="card column">
          <span>Для просмотра доступных позиций необходимо авторизоваться</span>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="content position-content">
        <div className="card column">
          <span>Загрузка доступных позиций...</span>
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
          <span>Нет доступных позиций для стейкинга</span>
        </div>
      </div>
    );
  }

  return (
    <div className="content position-content">
      <div className="card column">
        <span>Доступные позиции для стейкинга:</span>
        {giftsData.map((giftData, index) => (
          <GiftCard key={index} giftData={giftData} />
        ))}
      </div>
    </div>
  );
};
