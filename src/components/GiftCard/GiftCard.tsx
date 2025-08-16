import type { FC } from 'react';

import './GiftCard.scss'
import { publicUrl } from '@/helpers'
import {Coin} from "@/components/Icons";

interface GiftCardProps {
  giftData: {
    collection: string;
    model: string;
    count: number;
    speed: number;
    factor: number;
  };
}

export const GiftCard: FC<GiftCardProps> = ({giftData}) => {
  return (
    <div className="gift-card row">
      <img
        src={publicUrl('/koshchei.png')}
      />
      <div className="description column">
        <span>
          {giftData.collection} • {giftData.model}
        </span>
        <span>
          У вас: {giftData.count}
        </span>
        <div className="speed">
          <Coin width="12" height="12"/>
          {giftData.speed} в сутки • <span className="factor">X{giftData.factor}</span>
        </div>
      </div>
    </div>
  )
}