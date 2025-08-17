import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { List } from '@telegram-apps/telegram-ui';

import { Page } from '@/components/Page.tsx';
import { useUserContext } from '@/context/UserContext.tsx';
import './Level.scss';

import {getLevelInfoByKey} from "@/helpers/getLevelInfoByKey";
import LevelBackground from "@/components/LevelBackground";
import {GradientCircle} from "@/components/GradientCircle";
import {LevelIndicator} from "@/components/LevelIndicator";

interface LevelInfo {
  backgroundColors: string[];
  gradientColors: string[];
  numberText: string;
  textColor: string;
  isCircle: boolean;
}

export const Level: FC = () => {
  const { userInfo } = useUserContext();

  const [levelInformation, setLevelInformation] = useState<LevelInfo | null>(null)

  useEffect(() => {
    const levelInfo = getLevelInfoByKey(userInfo.level)
    if (levelInfo) {
      setLevelInformation(levelInfo)
    }
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
        {levelInformation.isCircle
          ? (
            <GradientCircle
              colors={levelInformation.gradientColors}
              size={200}
              text={levelInformation.numberText}
            />
          )
          : (
            <LevelIndicator
              colors={levelInformation.gradientColors}
              numberText={levelInformation.numberText}
              numberColor={levelInformation.textColor}
            />
          )
        }
      </List>
    </Page>
  );
};
