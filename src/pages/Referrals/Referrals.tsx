import { List } from '@telegram-apps/telegram-ui';
import { useEffect, useState } from 'react';
import type { FC } from 'react';

import { Page } from '@/components/Page.tsx';
import { useUserContext } from '@/context/UserContext';
import {createErrorNotification, createSuccessNotification, publicUrl} from '@/helpers';

import './Referrals.scss'
import {Coin, Cross} from '@/components/Icons';
import {useNotifications} from '@/context/NotificationContext';

export const Referrals: FC = () => {
  const { addNotification } = useNotifications()

  const {userInfo, referralInfo} = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [refLink, setRefLink] = useState<string>('')

  useEffect(() => {
    setRefLink(`https://t.me/eggonomicbot/app?startapp=${userInfo.uid}`)
  }, [userInfo.uid])

  const openReferralModal = () => {
    setIsModalOpen(true)
  }
  const copyLink = () => {
    try {
      if (!navigator || !navigator.clipboard) return

      void navigator.clipboard.writeText(refLink);
      addNotification(createSuccessNotification('Успех!', 'Ссылка успешно скопирована!'))
    } catch {
      addNotification(createErrorNotification('Ошибка!', 'Ошибка при копировании. Скопируйте в ручную ссылку.'))
    }
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }

  if (!referralInfo) return <></>

  return (
    <Page back={true}>
      <List className='referrals-page page'>
        <div className='body-block column'>
          <span className='title'>
            {referralInfo.referrals_count ? referralInfo.referrals_count + ' рефералов' : 'У вас нет рефералов'}
          </span>
          <span className='description'>
            Приглашайте друзей и получайте 30% от их заработка
          </span>
          <span className='card'>
            Вы заработали: {referralInfo.earned} <Coin width='10' height='11'/>
          </span>

        <div onClick={openReferralModal} className={`button-block ${isModalOpen ? 'hidden' : ''}`}>
          <div className='button'>
            Пригласить
          </div>
        </div>
        </div>
        <div className={`modal ${isModalOpen ? 'open' : ''} `}>
          <div className='content'>
            <div onClick={closeModal} className='close-button'>
              <Cross />
            </div>
            <div className='column'>
              <img
                src={publicUrl('./ref.png')}
                alt='referral'
              />
              <span className='modal-title'>
                Реферальная ссылка
              </span>
              <span className='modal-description'>
                Отправляйте эту ссылку своим друзьям, чтобы получить дополнительный доход
              </span>
              <div className='card column'>
                <span>
                  {refLink}
                </span>
                <div onClick={copyLink} className='button'>
                  Скопировать
                </div>
              </div>
            </div>
          </div>
        </div>
      </List>
    </Page>
  );
};
