import type { FC } from 'react';

import './GiftCard.scss'
import { publicUrl } from '@/helpers'
import {Coin} from '@/components/Icons';
import {useUserContext} from "@/context/UserContext";
import {useEffect, useState} from "react";
import {
  getFactorGradient
} from "@/helpers/getLevelInfoByKey";

interface GiftCardProps {
  giftData: {
    collection: string;
    model: string;
    count?: number;
    speed: number;
    multiplier: number;
    pic: string;
  };
}

export const GiftCard: FC<GiftCardProps> = ({giftData}) => {
  const {userInfo} = useUserContext()
  const [factorStyle, setFactorStyle] = useState<{backgroundImage: string}>({backgroundImage: ''})

  useEffect(() => {
    const gradient = getFactorGradient(userInfo.level)
    if (!gradient) return

    const [start, end] = gradient
    const factorStyle = {backgroundImage: `linear-gradient(180deg, ${start}, ${end})`}
    if (factorStyle) setFactorStyle(factorStyle)
  }, [userInfo.level])
  return (
    <div className='gift-card row'>
      <img
        src={publicUrl(giftData.pic)}
        alt={`${giftData.collection} ${giftData.model}`}
      />
      <div className='description column'>
        <span>
          {giftData.collection} • {giftData.model}
        </span>
        {giftData.count && (<span>
          У вас: {giftData.count}
        </span>)}
        <div className='speed'>
          <Coin width='12' height='12'/>
          {giftData.speed} в сутки • <span style={factorStyle} className='factor'>X{giftData.multiplier}</span>
        </div>
      </div>
    </div>
  )
}