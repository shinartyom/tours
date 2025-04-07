import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const TourDetailsPage = lazy(() => import('src/pages/dashboard/tour/details'));
const TourListPage = lazy(() => import('src/pages/dashboard/tour/list'));
const TourCreatePage = lazy(() => import('src/pages/dashboard/tour/new'));
const TourEditPage = lazy(() => import('src/pages/dashboard/tour/edit'));
const ContactPage = lazy(() => import('src/pages/contact-us'));
const AboutPage = lazy(() => import('src/pages/about-us'));
const FaqsPage = lazy(() => import('src/pages/faqs'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const tourRoutes = [
  {
    path: '/',
    element: <>{layoutContent}</>,
    children: [
      {
        path: 'tour',
        children: [
          { element: <TourListPage />, index: true },
          { path: 'list', element: <TourListPage /> },
          { path: ':id', element: <TourDetailsPage /> },
          { path: 'new', element: <TourCreatePage /> },
          { path: ':id/edit', element: <TourEditPage /> },
        ],
      },
      {
        path: 'contact-us',
        element: <ContactPage />,
      },
      {
        path: 'about-us',
        element: <AboutPage />,
      },
      {
        path: 'faqs',
        element: <FaqsPage />,
      },
    ],
  },
];
