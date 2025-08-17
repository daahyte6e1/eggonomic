import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { List } from '@telegram-apps/telegram-ui';

import { Page } from '@/components/Page.tsx';
import { useUserContext } from '@/context/UserContext.tsx';
import './Level.scss';

import {getLevelInfoByKey} from "@/helpers/getLevelInfoByKey";
import LevelBackground from "@/components/LevelBackground";

export const Level: FC = () => {
  const { userInfo } = useUserContext();

  const [levelInformation, setLevelInformation] = useState<any>(null)

  useEffect(() => {
    const levelInformation = getLevelInfoByKey(userInfo.level)
    console.log(levelInformation)
    setLevelInformation(levelInformation)
  }, [userInfo])
  return (
    <Page back={true}>
      <List className="level-page">
        {levelInformation && (
          <LevelBackground colors={levelInformation.backgroundColors}/>
        )}
      </List>
    </Page>
  );
};
