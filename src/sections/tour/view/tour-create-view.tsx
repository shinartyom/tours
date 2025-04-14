import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { useAuthContext } from 'src/auth/hooks';

import { TourNewEditForm } from '../tour-new-edit-form';

// ----------------------------------------------------------------------

export function TourCreateView() {
  const auth = useAuthContext();
  const isAdmin = auth.user?.role === 'admin';
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate(paths.tour.root);
    }
  }, [isAdmin, navigate]);

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a new tour"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Tour', href: paths.tour.root },
          { name: 'New tour' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <TourNewEditForm />
    </DashboardContent>
  );
}
