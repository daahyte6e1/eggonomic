import type { ComponentType, JSX } from 'react';

import { Home } from '@/pages/Home/Home';
import { Inventory } from '@/pages/Inventory/Inventory';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: Home },
  { path: '/inventory', Component: Inventory, title: 'Инвентарь' },
];
