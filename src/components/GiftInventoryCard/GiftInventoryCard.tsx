import type { FC } from 'react';
import './GiftInventoryCard.scss';

interface GiftInventoryCardProps {
  gift: {
    id: number;
    user_id: number;
    telegram_gift_id: string;
    telegram_gift_number: number;
    telegram_gift_name: string;
    telegram_gift_model: string;
    telegram_gift_backdrop: string;
    telegram_gift_symbol: string;
    pic_url: string;
    unix: number;
    data_url: string;
    msg_id: number;
    telegram_gift_model_rare: number;
    telegram_gift_backdrop_rare: number;
    telegram_gift_symbol_rare: number;
    last_user_id: number;
    staked: boolean;
    incubate: boolean;
    stakeable: boolean;
    incubation: boolean;
  };
}

export const GiftInventoryCard: FC<GiftInventoryCardProps> = ({ gift }) => {
  return (
    <div className="gift-inventory-card">
      <div className="gift-image-container">
        <img
          src={gift.data_url}
          alt={`${gift.telegram_gift_name} ${gift.telegram_gift_model}`}
          className="gift-image"
        />
      </div>
      <div className="gift-info">
        <div className="gift-name">{gift.telegram_gift_name}</div>
        <div className="gift-number">#{gift.telegram_gift_number}</div>
      </div>
    </div>
  );
};
