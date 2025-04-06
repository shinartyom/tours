import type { TourItem } from 'src/types/tour';

import { DashboardContent } from 'src/layouts/dashboard';

import { TourDetailsContent } from '../tour-details-content';

// ----------------------------------------------------------------------

type Props = {
  tour?: TourItem;
};

export function TourDetailsView({ tour }: Props) {
  return (
    <DashboardContent>
      {/* <TourDetailsToolbar
        backLink={paths.tour.root}
        editLink={paths.tour.edit(`${tour?.id}`)}
        liveLink="#"
        publish={publish || ''}
        onChangePublish={handleChangePublish}
        publishOptions={TOUR_PUBLISH_OPTIONS}
      />
      {renderTabs} */}

      {tour && <TourDetailsContent tour={tour} />}
    </DashboardContent>
  );
}
