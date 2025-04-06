import type { TourItem as TourItemInterface } from 'src/types/tour';

import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { TourItem } from './tour-item';

// ----------------------------------------------------------------------

type Props = {
  tours: TourItemInterface[];
  totalPage: number;
  setPage: (page: number) => void;
};

export function TourList({ tours, totalPage, setPage }: Props) {
  const router = useRouter();

  const handleView = useCallback(
    (id: string) => {
      router.push(paths.tour.details(id));
    },
    [router]
  );

  const handleEdit = useCallback(
    (id: string) => {
      router.push(paths.tour.edit(id));
    },
    [router]
  );

  const handleDelete = useCallback((id: string) => {
    console.info('DELETE', id);
  }, []);

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
      >
        {tours.map((tour) => (
          <TourItem
            key={tour._id}
            tour={tour}
            onView={() => handleView(tour._id)}
            onEdit={() => handleEdit(tour._id)}
            onDelete={() => handleDelete(tour._id)}
          />
        ))}
      </Box>

      <Pagination
        count={totalPage}
        onChange={(_e, page) => {
          setPage(page);
        }}
        sx={{
          mt: { xs: 5, md: 8 },
          [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
        }}
      />
    </>
  );
}
