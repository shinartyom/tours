import type { TourItem, ITourItem, ITourFilters } from 'src/types/tour';

import { toast } from 'sonner';
import { useState, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { TextField, InputAdornment } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useDebounce } from 'src/hooks/use-debounce';
import { useSetState } from 'src/hooks/use-set-state';

import { orderBy } from 'src/utils/helper';
import axiosInstance from 'src/utils/axios';
import { fIsAfter, fIsBetween } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';
import { _tours, _tourGuides, TOUR_SORT_OPTIONS, TOUR_SERVICE_OPTIONS } from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { useAuthContext } from 'src/auth/hooks';

import { TourList } from '../tour-list';
import { TourSort } from '../tour-sort';
import { TourFilters } from '../tour-filters';
import { TourFiltersResult } from '../tour-filters-result';

// ----------------------------------------------------------------------

export function TourListView() {
  const openFilters = useBoolean();
  const auth = useAuthContext();
  const isAdmin = auth.user?.role === 'admin';

  const [sortBy, setSortBy] = useState('latest');
  const [tours, setTours] = useState<TourItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState('');

  const searchDebounced = useDebounce(search, 100);

  useEffect(() => {
    axiosInstance
      .get('/api/tours', {
        params: {
          page,
          limit: 6,
          search: searchDebounced,
        },
      })
      .then((response) => {
        const { data } = response;

        setTotalPage(data.totalPages);

        if (data) {
          setTours(data.data);
        }
      })
      .catch((error) => {
        toast.error('Error fetching tour guides:', error);
      });
  }, [page, searchDebounced, totalPage]);

  const filters = useSetState<ITourFilters>({
    destination: [],
    tourGuides: [],
    services: [],
    startDate: null,
    endDate: null,
  });

  const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

  const dataFiltered = applyFilter({
    inputData: _tours,
    filters: filters.state,
    sortBy,
    dateError,
  });

  const canReset =
    filters.state.destination.length > 0 ||
    filters.state.tourGuides.length > 0 ||
    filters.state.services.length > 0 ||
    (!!filters.state.startDate && !!filters.state.endDate);

  const notFound = !dataFiltered.length && canReset;

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-end', sm: 'center' }}
      direction={{ xs: 'column', sm: 'row' }}
    >
      <TextField
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />

      <Stack direction="row" spacing={1} flexShrink={0}>
        <TourFilters
          filters={filters}
          canReset={canReset}
          dateError={dateError}
          open={openFilters.value}
          onOpen={openFilters.onTrue}
          onClose={openFilters.onFalse}
          options={{
            tourGuides: _tourGuides,
            services: TOUR_SERVICE_OPTIONS.map((option) => option.label),
          }}
        />

        <TourSort sort={sortBy} onSort={handleSortBy} sortOptions={TOUR_SORT_OPTIONS} />
      </Stack>
    </Stack>
  );

  const renderResults = <TourFiltersResult filters={filters} totalResults={dataFiltered.length} />;

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Tour', href: paths.tour.root },
          { name: 'List' },
        ]}
        action={
          isAdmin ? (
            <Button
              component={RouterLink}
              href={paths.tour.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Tour
            </Button>
          ) : null
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Stack spacing={2.5} sx={{ mb: { xs: 3, md: 5 } }}>
        {renderFilters}

        {canReset && renderResults}
      </Stack>

      {notFound && <EmptyContent filled sx={{ py: 10 }} />}

      <TourList tours={tours} totalPage={totalPage} setPage={setPage} />
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  sortBy: string;
  dateError: boolean;
  filters: ITourFilters;
  inputData: ITourItem[];
};

const applyFilter = ({ inputData, filters, sortBy, dateError }: ApplyFilterProps) => {
  const { services, destination, startDate, endDate, tourGuides } = filters;

  const tourGuideIds = tourGuides.map((tourGuide) => tourGuide.id);

  // Sort by
  if (sortBy === 'latest') {
    inputData = orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    inputData = orderBy(inputData, ['createdAt'], ['asc']);
  }

  if (sortBy === 'popular') {
    inputData = orderBy(inputData, ['totalViews'], ['desc']);
  }

  // Filters
  if (destination.length) {
    inputData = inputData.filter((tour) => destination.includes(tour.destination));
  }

  if (tourGuideIds.length) {
    inputData = inputData.filter((tour) =>
      tour.tourGuides.some((filterItem) => tourGuideIds.includes(filterItem.id))
    );
  }

  if (services.length) {
    inputData = inputData.filter((tour) => tour.services.some((item) => services.includes(item)));
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((tour) =>
        fIsBetween(startDate, tour.available.startDate, tour.available.endDate)
      );
    }
  }

  return inputData;
};
