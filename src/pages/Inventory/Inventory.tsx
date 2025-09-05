import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { List } from '@telegram-apps/telegram-ui';
import { initDataRaw as _initDataRaw, useSignal } from '@telegram-apps/sdk-react';
import { Link } from '@/components/Link/Link.tsx'
import { Page } from '@/components/Page.tsx';
import { useUserContext } from '@/context/UserContext.tsx';
import { useGiftContext } from '@/context/GiftContext.tsx';
import {APIManager} from '@/helpers';
import './Inventory.scss';
import {SearchBlock} from '@/components/SearchBlock/SearchBlock';
import { GiftInventoryCard } from '@/components/GiftInventoryCard';
import {Arrow, Coin} from '@/components/Icons';
import {getLevelTitleByKey, getPageBackgroundColorByKey} from '@/helpers/getLevelInfoByKey';
import {DynamicBackground} from "@/components/BacgroudShapes";

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
  const {userInfo, userPoints, summarySpeed, isLoading} = useUserContext();
  const {setGifts} = useGiftContext();
  const initDataRaw = useSignal(_initDataRaw);
  const [localGifts, setLocalGifts] = useState<Gift[]>([]);
  const [userInfoLevel, setUserInfoLevel] = useState<string>('');
  const [filteredGifts, setFilteredGifts] = useState<FilteredGifts>({staked: [], notStaked: []});

  const updateFilteredData = (gifts: Gift[]): void => {
    const filteredGifts = gifts.reduce((accumulator, gift: Gift) => {
      if (gift.staked) accumulator.staked.push(gift)
      if (!gift.staked) accumulator.notStaked.push(gift)

      return accumulator
    }, {staked: [], notStaked: []} as FilteredGifts)
    setFilteredGifts(filteredGifts)
  }
  useEffect(() => {
    const fetchInventory = async () => {
      if (!initDataRaw || !userInfo.key) return;

      const data = await APIManager.getTextable(`/eggs/api/inventory/${userInfo.key}`, initDataRaw);
      const giftsData = Array.isArray(data) ? (data as Gift[]) : [];
      setLocalGifts(giftsData);
      setGifts(giftsData);
      updateFilteredData(giftsData)
    };

    void fetchInventory();
  }, [initDataRaw, userInfo.key]);

  const handleSearch = (searchText: string) => {
    if (!searchText.trim()) {
      updateFilteredData(localGifts);
      return;
    }

    const filtered = localGifts.reduce((accumulator: FilteredGifts, gift: Gift) => {
      const isCorrectBySearchText =
        gift.telegram_gift_name.toLowerCase().includes(searchText.toLowerCase()) ||
        gift.telegram_gift_model.toLowerCase().includes(searchText.toLowerCase()) ||
        gift.telegram_gift_symbol.toLowerCase().includes(searchText.toLowerCase())

      if (!isCorrectBySearchText) return accumulator

      if (gift.staked) accumulator.staked.push(gift)
      if (!gift.staked) accumulator.notStaked.push(gift)

      return accumulator
    }, {staked: [], notStaked: []} as FilteredGifts)

    setFilteredGifts(filtered);
  };


  const [levelTitle, setLevelTitle] = useState<string>('')
  const [backgroundColorByKey, setBackgroundColorByKey] = useState<string[]>([])

  useEffect(() => {
    if (!userInfo.level) return

    setUserInfoLevel(userInfo.level)
    const backgroundColorByKey = getPageBackgroundColorByKey(userInfo.level)
    if (backgroundColorByKey) setBackgroundColorByKey(backgroundColorByKey)

    const levelTitle = getLevelTitleByKey(userInfo.level)
    if (levelTitle) setLevelTitle(levelTitle)

  }, [userInfo.level])

  const hasNotStakedGifts = Boolean(filteredGifts.notStaked.length)

  return (
    <Page back={true}>
      <List className='inventory-page page'>
        <div className=''>
          <SearchBlock onSearch={handleSearch}/>

          <div className={`gift-grid-content content column ${isLoading ? 'loading' : ''}`} style={{ position: 'relative' }}>
            <DynamicBackground  colors={backgroundColorByKey} />
            <div className='card'>
              <div className='card-header column'>
                <div className='balance'>
                  {userPoints}
                  <Coin height='17' width='16'/>
                </div>
                <Link to='/level' className={`level ${userInfoLevel}`}>
                  {levelTitle}
                  <Arrow/>
                </Link>
                <div className='staked-block'>
                  <span> Добыча в час: </span>
                  <span>{summarySpeed} <Coin width='9' height='10'/> </span>
                </div>
              </div>
              <div className='gifts-grid'>
                {filteredGifts.staked.map((gift) => (
                  <GiftInventoryCard key={gift.id} gift={gift}/>
                ))}
              </div>
            </div>
            {hasNotStakedGifts && (<div className='card'>
                <div className='card-header column'>
                  <div className='balance'>
                    Профиль
                  </div>
                  <div className='staked-block'>
                    <span> Добыча в час: </span>
                    <span> Неактивно </span>
                  </div>
                </div>
                <div className='gifts-grid'>
                  {filteredGifts.notStaked
                    .map((gift) => (
                      <GiftInventoryCard key={gift.id} gift={gift}/>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </List>
    </Page>
  );
}
