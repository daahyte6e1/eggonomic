import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { List, Section } from '@telegram-apps/telegram-ui';
import { initDataRaw as _initDataRaw, useSignal } from '@telegram-apps/sdk-react';

import { Page } from '@/components/Page.tsx';
import { useUserContext } from '@/context/UserContext.tsx';
import { APIManager } from '@/helpers';
import './Inventory.scss';
import {SearchBlock} from "@/components/SearchBlock/SearchBlock";
import { GiftInventoryCard } from '@/components/GiftInventoryCard';
import { BalanceBlock } from '@/components/BalanceBlock/BalanceBlock';
import {Coin} from "@/components/Icons";

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

export const Inventory: FC = () => {
  const { userInfo, userPoints } = useUserContext();
  const initDataRaw = useSignal(_initDataRaw);
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [filteredGifts, setFilteredGifts] = useState<Gift[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      if (!initDataRaw) {
        setError('Данные инициализации не найдены');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const data = await APIManager.getTextable(`/eggs/api/inventory/${userInfo.key}`, initDataRaw);
        const giftsData = Array.isArray(data) ? (data as Gift[]) : [];
        setGifts(giftsData);
        setFilteredGifts(giftsData);
      } catch {
        // console.error('Ошибка при загрузке инвентаря:', err);
        setError('Не удалось загрузить инвентарь');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchInventory();
  }, [initDataRaw, userInfo.key]);

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
    
    if (!searchText.trim()) {
      setFilteredGifts(gifts);
      return;
    }

    const filtered = gifts.filter(gift => 
      gift.telegram_gift_name.toLowerCase().includes(searchText.toLowerCase()) ||
      gift.telegram_gift_model.toLowerCase().includes(searchText.toLowerCase()) ||
      gift.telegram_gift_symbol.toLowerCase().includes(searchText.toLowerCase())
    );
    
    setFilteredGifts(filtered);
  };


  if (isLoading) {
    return (
      <Page back={true} backTo="/">
        <div className="inventory-loader">
          <div className="loader-spinner"></div>
          <p>Загрузка инвентаря...</p>
        </div>
      </Page>
    );
  }

  if (error) {
    return (
      <Page back={true} backTo="/">
        <div className="inventory-error">
          <p>{error}</p>
        </div>
      </Page>
      );
  }

  return (
    <Page back={true} backTo="/">
      <List className="inventory-page">
          <SearchBlock onSearch={handleSearch} />

        {filteredGifts.length === 0 && searchText ? (
          <div className="no-results">
            <p>По вашему запросу ничего не найдено</p>
          </div>
        ) : filteredGifts.length === 0 ? (
          <div className="inventory-empty">
            <p>У вас пока нет подарков</p>
          </div>
        ) : (
          <div className="gift-grid-content content">
            <div className="card">
              <div className="card-header column">
                <div className="balance">
                  {userPoints}
                  <Coin height="17" width="16" />
                </div>
                <div>
                  test
                </div>
              </div>
            {filteredGifts.filter(gift => gift.staked).length > 0 && (
              <div className="gifts-grid">
                {filteredGifts
                  .filter(gift => gift.staked)
                  .map((gift) => (
                    <GiftInventoryCard key={gift.id} gift={gift} />
                  ))}
              </div>
            )}
            </div>
          </div>
        )}
      </List>
    </Page>
  );
};
