import type { ComponentType, JSX } from 'react';

import { Home } from '@/pages/Home/Home';
import { Inventory } from '@/pages/Inventory/Inventory';
import {Level} from '@/pages/Level/Level'
import {SingleLevel} from "@/pages/SingleLevel/SingleLevel";
import { GiftDetail } from '@/pages/GiftDetail';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: Home },
  { path: '/inventory', Component: Inventory, title: 'Инвентарь' },
  { path: '/level', Component: Level, title: 'Уровни' },
  { path: '/level/:levelKey', Component: SingleLevel, title: 'Уровень' },
  { path: '/gift/:giftId', Component: GiftDetail, title: 'Детали подарка' },
];
