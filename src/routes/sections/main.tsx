import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { SimpleLayout } from 'src/layouts/simple';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const MaintenancePage = lazy(() => import('src/pages/maintenance'));
const Page500 = lazy(() => import('src/pages/error/500'));
const Page403 = lazy(() => import('src/pages/error/403'));
const Page404 = lazy(() => import('src/pages/error/404'));

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: 'maintenance',
        element: (
          <SimpleLayout content={{ compact: true }}>
            <MaintenancePage />
          </SimpleLayout>
        ),
      },
      { path: '500', element: <Page500 /> },
      { path: '404', element: <Page404 /> },
      { path: '403', element: <Page403 /> },
    ],
  },
];
