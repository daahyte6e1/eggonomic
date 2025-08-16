import type { FC } from 'react';
import { useEffect, useState } from 'react';
import './ActivePositions.scss'

import {GiftCard} from "@/components/GiftCard/GiftCard";
import { APIManager } from '@/helpers/APIManager';
import { useUserData } from '@/hooks/useUserData';

interface NFTData {
  amount_to_checkin: number;
  apr: number;
  count: number;
  dop_points: number;
  gift_id: number;
  id: number;
  last_claim_unix: number;
  last_update_points_unix: number;
  model: string;
  model_rare: string;
  name: string;
  need_checkin: boolean;
  next_check_in: number;
  pic: string;
  points_today: number;
  points_total: number;
  unix_cycle: number;
  user_uid: number;
}

interface APIResponse {
  nfts: NFTData[];
  result: boolean;
  stake_points_count: number;
}

interface GiftData {
  collection: string;
  model: string;
  count: number;
  speed: number;
  factor: number;
}

export const ActivePositions: FC = () => {
  const { key, isAuthenticated } = useUserData();
  const [giftsData, setGiftsData] = useState<GiftData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStakes = async () => {
      if (!isAuthenticated || !key) {
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const response: APIResponse = await APIManager.get<APIResponse>('/eggs/api/load_stakes', key);
        
        if (response.result && response.nfts) {
          const transformedData: GiftData[] = response.nfts.map(nft => ({
            collection: nft.name,
            model: nft.model,
            count: nft.count,
            speed: 24, // пока оставляем 24
            factor: 4, // пока оставляем 4
          }));
          
          setGiftsData(transformedData);
        }
      } catch (err) {
        console.error('Ошибка при загрузке активных позиций:', err);
        setError('Не удалось загрузить активные позиции');
      } finally {
        setIsLoading(false);
      }
    };

    loadStakes();
  }, [isAuthenticated, key]);

  if (!isAuthenticated) {
    return (
      <div className="content position-content">
        <div className="card column">
          <span>Для просмотра активных позиций необходимо авторизоваться</span>
          <div>key: {key}</div>
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


