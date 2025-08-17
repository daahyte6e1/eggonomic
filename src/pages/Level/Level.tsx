import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { List } from '@telegram-apps/telegram-ui';

import { Page } from '@/components/Page.tsx';
import { useUserContext } from '@/context/UserContext.tsx';
import './Level.scss';

import {getLevelInfoByKey} from "@/helpers/getLevelInfoByKey";
import LevelBackground from "@/components/LevelBackground";
import {LevelIndicator} from "@/components/LevelIndicator";

export const Level: FC = () => {
  const { userInfo } = useUserContext();

  const [levelInformation, setLevelInformation] = useState<any>(null)

  useEffect(() => {
    const levelInformation = getLevelInfoByKey(userInfo.level)
    console.log(levelInformation)
    setLevelInformation(levelInformation)
  }, [userInfo])
  if (!levelInformation) {
    return (
      <></>
    )
  }
  return (
    <Page back={true}>
      <List className="level-page">
        <div className='background-block'>
          <LevelBackground colors={levelInformation.backgroundColors}/>
        </div>
        <LevelIndicator
          colors={levelInformation.gradientColors}
          number={levelInformation.numberText}
          numberColor={levelInformation.textColor}
        />
      </List>
    </Page>
  );
};
