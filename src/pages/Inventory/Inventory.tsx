import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { List } from '@telegram-apps/telegram-ui';
import { initDataRaw as _initDataRaw, useSignal } from '@telegram-apps/sdk-react';

import { Page } from '@/components/Page.tsx';
import { useUserContext } from '@/context/UserContext.tsx';
import { APIManager } from '@/helpers';
import './Inventory.scss';
import {SearchBlock} from "@/components/SearchBlock/SearchBlock";
import { GiftInventoryCard } from '@/components/GiftInventoryCard';
import {Arrow, Coin} from "@/components/Icons";
import {getLevelTitleByKey} from "@/helpers/getLevelInfoByKey";

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

type FilteredGifts = {
  staked: Gift[],
  notStaked: Gift[]
}

export const Inventory: FC = () => {
  const { userInfo, userPoints } = useUserContext();
  const initDataRaw = useSignal(_initDataRaw);
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [filteredGifts, setFilteredGifts] = useState<FilteredGifts>({staked: [], notStaked: []});
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
        // const giftsData = [];
        const giftsData = Array.isArray(data) ? (data as Gift[]) : [];
        const filteredGifts = giftsData.reduce((accumulator, gift: Gift) => {
          if (gift.staked) accumulator.staked.push(gift)
          if (!gift.staked) accumulator.notStaked.push(gift)

          return accumulator
        }, {staked: [], notStaked: []} as FilteredGifts)
        setGifts(giftsData);
        setFilteredGifts(filteredGifts);
      } catch {
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
      setFilteredGifts(filteredGifts);
      return;
    }

    const filtered = gifts.reduce((accumulator, gift: Gift) => {
      const isCorrectBySearchText =
        gift.telegram_gift_name.toLowerCase().includes(searchText.toLowerCase()) ||
        gift.telegram_gift_model.toLowerCase().includes(searchText.toLowerCase()) ||
        gift.telegram_gift_symbol.toLowerCase().includes(searchText.toLowerCase())

      if (!isCorrectBySearchText) return accumulator

      if (gift.staked) accumulator.staked.push(gift)
      if (!gift.staked) accumulator.notStaked.push(gift)

      return accumulator
    }, {staked: [], notStaked: []})
    
    setFilteredGifts(filtered);
  };


  const [levelTitle, setLevelTitle] = useState<string>('')

  useEffect(() => {
    const levelTitle = getLevelTitleByKey(userInfo.level)
    setLevelTitle(levelTitle)
  }, [userInfo])

  const hasStakedGifts = Boolean(filteredGifts.staked.length)
  const hasNotStakedGifts = Boolean(filteredGifts.notStaked.length)
  const hasGifts = hasStakedGifts || hasNotStakedGifts

  return (
    <Page back={true}>
      <List className="inventory-page">
        <div className="">
          <SearchBlock onSearch={handleSearch} />
          {isLoading
            ? (<div className='loading' />)
            : hasGifts && searchText
              ? (
                <div className="no-results">
                  <p>По вашему запросу ничего не найдено</p>
                </div>
              )
              : !hasGifts
                ? (
                  <div className="inventory-empty">
                    <p>У вас пока нет подарков</p>
                  </div>
                )
                : (
                  <div className="gift-grid-content content column bg-ellipse-sm bg-ellipse bg-ellipse-top">
                    {hasStakedGifts && (<div className="card">
                        <div className="card-header column">
                          <div className="balance">
                            {userPoints}
                            <Coin height="17" width="16" />
                          </div>
                          <div className='level'>
                            {levelTitle}
                            <Arrow/>
                          </div>
                          <div className="staked-block">
                            <span> Добыча в час: </span>
                            <span>1000 <Coin width='9' height='10'/> </span>
                          </div>
                        </div>
                        <div className="gifts-grid">
                          {filteredGifts.staked.map((gift) => (
                            <GiftInventoryCard key={gift.id} gift={gift} />
                          ))}
                        </div>
                      </div>
                    )}
                    {hasNotStakedGifts && (<div className="card">
                        <div className="card-header column">
                          <div className="balance">
                            Профиль
                          </div>
                          <div className="staked-block">
                            <span> Добыча в час: </span>
                            <span> Неактивно </span>
                          </div>
                        </div>
                        <div className="gifts-grid">
                          {filteredGifts.notStaked
                            .map((gift) => (
                              <GiftInventoryCard key={gift.id} gift={gift} />
                            ))}
                        </div>
                      </div>
                    )}
            </div>
          )}
        </div>
        </List>
    </Page>
  );
};
