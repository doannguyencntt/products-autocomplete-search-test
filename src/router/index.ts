import { PAGES } from '@/shared/constants';
import type { RouteInfo } from '@/shared/interface/routes.interface';
import { lazy } from 'react';

type PageKey = keyof typeof PAGE_MAP;

export const PAGE_MAP = {
  home: lazy(() => import('@/pages/home')),
  products: lazy(() => import('@/pages/products')),
} as const;

export const ROUTERS: RouteInfo[] = [
  {
    key: PAGES.HOME,
    path: PAGES.HOME,
    component: 'home' as PageKey,
  },
  {
    key: PAGES.PRODUCTS,
    path: PAGES.PRODUCTS,
    component: 'products' as PageKey,
  }
]