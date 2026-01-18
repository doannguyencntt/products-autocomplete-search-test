import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { PAGE_MAP, ROUTERS } from '@/router';
import FullscreenLoading from '@/shared/components/Loading/FullscreenLoading';

const AppRouter = () => {
  return (
    <Suspense fallback={<FullscreenLoading />}>
      <Routes>
        <Route element={<MainLayout />}>
          {ROUTERS.map(route => {
            const PageComponent = PAGE_MAP[route.component as keyof typeof PAGE_MAP];
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<PageComponent />}
              />
            );
          })}
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
