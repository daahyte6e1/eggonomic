import { List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';

import { Page } from '@/components/Page.tsx';
import { useGiftContext } from '@/context/GiftContext.tsx';

import './GiftDetail.scss'
import Lottie from 'lottie-react';
import {TonCoin} from '@/components/Icons';
import {useEffect, useState} from 'react';
import {APIManager, createErrorNotification, createSuccessNotification, createTransaction} from '@/helpers';
import {useTonConnectUI} from '@tonconnect/ui-react';
import {useNotifications} from '@/context/NotificationContext';
import {useUserContext} from "@/context/UserContext";

interface LottieData {
  [key: string]: unknown;
}
interface Result {
  result: boolean
}
export const GiftDetail: FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const { addNotification } = useNotifications()
  const { giftId } = useParams<{ giftId: string }>();
  const { getGiftById } = useGiftContext();
  const {userInfo} = useUserContext()
  const navigate = useNavigate();

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
      addNotification(createSuccessNotification('Success!', 'The gift will be displayed after moderation.'))
    } catch (error) {
      // Withdrawal error handled below
      if (error instanceof Error && error.message.includes('Transaction was not sent')) {
        addNotification(createErrorNotification('Error!', 'Transaction was not sent!'))
        return
      }
      addNotification(createErrorNotification('Error!', 'Something went wrong!'))
    }
  }

  const stakeManager = async () => {
    try {
      const jsondata = JSON.stringify({ gift_id: giftId })
      const res: Result = await APIManager.post('/eggs/api/stake_manage', jsondata, userInfo.key)
      if (res.result) {
        navigate('/inventory')
      }
    } catch {
      // Ошибка уже обработана в UserService
    }
  }

  const handleWithdrawal = () => {
    void withdrawal();
  };
  const handleStake = () => {
    void stakeManager();
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
                <span>Withdrawal fee:</span>
                <div> 0.2 <TonCoin /> </div>
              </div>
            </div>
            <div className='gift-modal-info column'>
              <div className='column table'>
                <div className='item row'>
                <span className='title'>
                  Model
                </span>
                  <span className='description'>
                  {gift.telegram_gift_model} ({gift.telegram_gift_model_rare}%)
                </span>
                </div>
                <div className='item row'>
                <span className='title'>
                  Background
                </span>
                  <span className='description'>
                  {gift.telegram_gift_backdrop} ({gift.telegram_gift_backdrop_rare}%)
                </span>
                </div>
                <div className='item row'>
                <span className='title'>
                  Symbol
                </span>
                  <span className='description'>
                  {gift.telegram_gift_symbol} ({gift.telegram_gift_symbol_rare}%)
                </span>
                </div>
              </div>
            </div>
          </div>

          <div>{JSON.stringify(gift)}</div>
          <div className='button-block'>
            <div onClick={handleWithdrawal} className='button'>
              Withdraw
            </div>

            {gift.stakeable && <div onClick={handleStake} className='button'>
              {!gift.staked ? 'Stake' : 'Unstake'}
            </div>}
          </div>
        </div>
      </List>
    </Page>
  );
};
