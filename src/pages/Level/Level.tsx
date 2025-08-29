import type { FC } from 'react';

import { useEffect, useState } from 'react';
import { List } from '@telegram-apps/telegram-ui';

import { Page } from '@/components/Page.tsx';
import { useUserContext } from '@/context/UserContext.tsx';
import './Level.scss';

import {
  getLevelByKey,
  getLevelCardTitleByKey,
  getLevelMultiplierByKey,
  getLevelGradientTextColorByKey,
  getLevelInfoByKey,
  getLevelMinPriceByKey,
  LEVEL_LIST
} from "@/helpers/getLevelInfoByKey";
import LevelBackground from "@/components/LevelBackground";
import {GradientCircle} from "@/components/GradientCircle";
import {LevelIndicator} from "@/components/LevelIndicator";
import {Factor, GradientCoin} from "@/components/Icons";
import {Link} from "@/components/Link/Link";

interface LevelInfo {
  level: number;
  backgroundColors: string[];
  gradientColors: string[];
  numberText: string;
  textColor: string;
  isCircle: boolean;
  levelPageTitle: string;
  cardTitle: string;
  levelPageDescription: string;
}

export const Level: FC = () => {
  const { userInfo } = useUserContext();

  const [levelInformation, setLevelInformation] = useState<LevelInfo | null>(null)
  const [activeLevel, setActiveLevel] = useState<string>('')

  const updateActiveLevelHandler = (level: string) => {
    if (checkIsDisabled(level)) return

    setActiveLevel(level)
  }

  useEffect(() => {
    const levelInfo = getLevelInfoByKey(userInfo.level)
    if (levelInfo) setLevelInformation(levelInfo)

  }, [userInfo.level])

  const checkIsDisabled = (levelKey: string) => {
    const levelNumber = getLevelByKey(levelKey)
    const activeLevelNumber = getLevelByKey(userInfo.level)
    return levelNumber <= activeLevelNumber
  }

  if (!levelInformation) {
    return (
      <></>
    )
  }

  return (
    <Page back={true}>
      <List className="level-page column page">
        <div className='background-block'>
          <LevelBackground colors={levelInformation.backgroundColors}/>
        </div>
        <div className="column information-block">
          {levelInformation.isCircle
            ? (
              <GradientCircle
                colors={levelInformation.gradientColors}
                size={100}
                text={levelInformation.numberText}
                textColor={levelInformation.textColor}
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
          <span className="title">{levelInformation.levelPageTitle}</span>
          <span className="description">{levelInformation.levelPageDescription}</span>
        </div>
        <div className="level-list column">
          {LEVEL_LIST.map((el) => (
            <div 
              onClick={() => updateActiveLevelHandler(el)}
              key={el} 
              className={`card column ${activeLevel === el ? 'active' : ''} ${checkIsDisabled(el) ? 'disabled' : ''}`}
            >
              <span className="title">
                {getLevelCardTitleByKey(el)}
              </span>
              <div className="additions">
                <div className="item">
                  <Factor />
                  Доходность Х{getLevelMultiplierByKey(el)}
                </div>
              </div>
              <div className={el + ' item price-item'}>
                <GradientCoin start={getLevelGradientTextColorByKey(el).start} end={getLevelGradientTextColorByKey(el).end} />
                От {getLevelMinPriceByKey(el)} TON
              </div>
            </div>
          ))}
        </div>
        <div className="button-block">
          <div className="block">
          <Link to={`/level/${activeLevel}`} className={`button ${activeLevel ? 'active' : 'in-active'}`}>
            Повысить ранг
          </Link>
          </div>
        </div>
      </List>
    </Page>
  );
};
