import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { List, Section } from '@telegram-apps/telegram-ui';
import { initDataRaw as _initDataRaw, useSignal } from '@telegram-apps/sdk-react';

import { Page } from '@/components/Page.tsx';
import { useUserContext } from '@/context/UserContext.tsx';
import { APIManager } from '@/helpers';
import './Inventory.scss';

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
  const { userInfo } = useUserContext();
  const initDataRaw = useSignal(_initDataRaw);
  const [gifts, setGifts] = useState<Gift[]>([]);
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
        setGifts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Ошибка при загрузке инвентаря:', err);
        setError('Не удалось загрузить инвентарь');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInventory();
  }, [initDataRaw, userInfo.key]);

  const formatDate = (unix: number) => {
    return new Date(unix * 1000).toLocaleDateString('ru-RU');
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
        <Section header="Инвентарь">
          {gifts.length === 0 ? (
            <div className="inventory-empty">
              <p>В инвентаре пока нет подарков</p>
            </div>
          ) : (
            gifts.map((gift) => (
              <div key={gift.id} className="gift-card">
              <div className="gift-header">
                <h3>{gift.telegram_gift_name}</h3>
                <span className="gift-number">#{gift.telegram_gift_number}</span>
              </div>
              
              <div className="gift-details">
                <div className="gift-model">
                  <strong>Модель:</strong> {gift.telegram_gift_model}
                </div>
                
                <div className="gift-backdrop">
                  <strong>Фон:</strong> {gift.telegram_gift_backdrop}
                </div>
                
                <div className="gift-symbol">
                  <strong>Символ:</strong> {gift.telegram_gift_symbol}
                </div>
              </div>
              
              <div className="gift-status">
                <span className={`status ${gift.staked ? 'staked' : ''}`}>
                  {gift.staked ? 'Застейкано' : 'Не застейкано'}
                </span>
                <span className={`status ${gift.incubate ? 'incubating' : ''}`}>
                  {gift.incubate ? 'В инкубаторе' : 'Не в инкубаторе'}
                </span>
              </div>
              
              <div className="gift-date">
                <small>Получен: {formatDate(gift.unix)}</small>
              </div>
            </div>
          ))
        )}
        </Section>
      </List>
    </Page>
  );
};
