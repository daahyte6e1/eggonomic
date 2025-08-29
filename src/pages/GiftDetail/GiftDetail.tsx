import { List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import { Page } from '@/components/Page.tsx';
import { useGiftContext } from '@/context/GiftContext.tsx';

import './GiftDetail.scss'
import Lottie from 'lottie-react';
import {TonCoin} from '@/components/Icons';
import {useEffect, useState} from 'react';
import {createErrorNotification, createSuccessNotification, createTransaction} from '@/helpers';
import {useTonConnectUI} from '@tonconnect/ui-react';
import {useNotifications} from '@/context/NotificationContext';

interface LottieData {
  [key: string]: unknown;
}
export const GiftDetail: FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const { addNotification } = useNotifications()
  const { giftId } = useParams<{ giftId: string }>();
  const { getGiftById } = useGiftContext();
  
  const [isLottieLoaded, setIsLottieLoaded] = useState(false);
  const [isLottieLoading, setIsLottieLoading] = useState(false);
  const [lottieData, setLottieData] = useState<LottieData | null>(null);
  
  useEffect(() => {
    if (giftId) {
      const gift = getGiftById(parseInt(giftId, 10));
      if (gift?.pic_url && !isLottieLoaded && !isLottieLoading) {
        setIsLottieLoading(true);

        fetch(gift.pic_url)
          .then(response => response.json())
          .then((data: LottieData) => {
            setLottieData(data);
            setIsLottieLoaded(true);
            setIsLottieLoading(false);
          })
          .catch(() => {
            setIsLottieLoading(false);
            addNotification(createErrorNotification('Ошибка!', 'Ошибка загрузки!'))
          });
      }
    }
  }, [giftId, getGiftById, isLottieLoaded, isLottieLoading, addNotification]);
  
  if (!giftId) return <Navigate to='/inventory' replace />;
  
  const gift = getGiftById(parseInt(giftId, 10));
  if (!gift) return <Navigate to='/inventory' replace />;

  const withdrawal = async () => {
    try {
      await createTransaction(tonConnectUI, 0.2, `refund${gift?.telegram_gift_id}`)
      addNotification(createSuccessNotification('Успех!', 'Подарок будет выведен после модерации.'))
    } catch {
      addNotification(createErrorNotification('Ошибка!', 'Ошибка создания транзакции!'))
    }
  }

  const handleWithdrawal = () => {
    void withdrawal();
  };

  if (!gift) {
    return <Navigate to='/inventory' replace />;
  }

  return (
    <Page back={true}>
      <List className='gift-detail-page page'>
        <div className='modal-body column'>
          <div className='column gift-info'>
            <div className='gift-modal-image-container'>
              {!isLottieLoaded && (
                <img
                  src={gift.data_url}
                  alt={`${gift.telegram_gift_name} ${gift.telegram_gift_model}`}
                  className='gift-modal-image'
                />
              )}

              {isLottieLoaded && lottieData && (
                <div className='gift-modal-lottie-container'>
                  <Lottie
                    animationData={lottieData}
                    loop={true}
                    autoplay={true}
                    className='gift-modal-lottie'
                  />
                </div>
              )}

              {isLottieLoading && (
                <div className='gift-modal-loading'>
                  <div className='loading-spinner'></div>
                </div>
              )}
            </div>
            <div className='flex withdrawal'>
              <div className='card column'>
                <span>Комиссия за вывод:</span>
                <div> 0.2 <TonCoin /> </div>
              </div>
            </div>
            <div className='gift-modal-info column'>
              <div className='column table'>
                <div className='item row'>
                <span className='title'>
                  Модель
                </span>
                  <span className='description'>
                  {gift.telegram_gift_model} ({gift.telegram_gift_model_rare}%)
                </span>
                </div>
                <div className='item row'>
                <span className='title'>
                  Фон
                </span>
                  <span className='description'>
                  {gift.telegram_gift_backdrop} ({gift.telegram_gift_backdrop_rare}%)
                </span>
                </div>
                <div className='item row'>
                <span className='title'>
                  Узор
                </span>
                  <span className='description'>
                  {gift.telegram_gift_symbol} ({gift.telegram_gift_symbol_rare}%)
                </span>
                </div>
              </div>
            </div>
          </div>

          <div onClick={handleWithdrawal}  className='button-block'>
            <div className='button'>
              Вывести
            </div>
          </div>
        </div>
      </List>
    </Page>
  );
};
