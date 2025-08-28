import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

interface Gift {
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
}

interface GiftContextType {
  gifts: Gift[];
  setGifts: (gifts: Gift[]) => void;
  getGiftById: (id: number) => Gift | undefined;
}

const GiftContext = createContext<GiftContextType | undefined>(undefined);

interface GiftProviderProps {
  children: ReactNode;
}

export function GiftProvider({ children }: GiftProviderProps) {
  const [gifts, setGifts] = useState<Gift[]>([]);

  const getGiftById = (id: number) => {
    return gifts.find(gift => gift.id === id);
  };

  return (
    <GiftContext.Provider value={{ gifts, setGifts, getGiftById }}>
      {children}
    </GiftContext.Provider>
  );
}

export function useGiftContext() {
  const context = useContext(GiftContext);
  if (context === undefined) {
    throw new Error('useGiftContext must be used within a GiftProvider');
  }
  return context;
}
