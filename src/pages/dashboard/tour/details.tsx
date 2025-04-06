import type { TourItem } from 'src/types/tour';

import { toast } from 'sonner';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';

import { useParams } from 'src/routes/hooks';

import axiosInstance from 'src/utils/axios';

import { CONFIG } from 'src/config-global';

import { TourDetailsView } from 'src/sections/tour/view';

// ----------------------------------------------------------------------

const metadata = { title: `Tour details | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  const { id = '' } = useParams();
  const [tour, setTour] = useState<TourItem | undefined>();

  useEffect(() => {
    axiosInstance
      .get(`/api/tours/${id}`)
      .then((response) => {
        const { data } = response;
        if (data) {
          setTour(data);
        }
      })
      .catch((error) => {
        toast.error('Error fetching tour:', error);
      });
  }, [id]);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TourDetailsView tour={tour} />
    </>
  );
}
