import type { BoxProps } from '@mui/material/Box';

import { useState } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { Map, MapPopup, MapMarker, MapControl } from 'src/components/map';

// ----------------------------------------------------------------------

type ContactMapProps = BoxProps & {
  contacts: {
    latlng: number[];
    address: string;
    phoneNumber: string;
  }[];
};

export function ContactMap({ contacts, sx, ...other }: ContactMapProps) {
  const theme = useTheme();

  const [popupInfo, setPopupInfo] = useState<ContactMapProps['contacts'][0] | null>(null);

  return (
    <Box
      sx={{
        zIndex: 0,
        borderRadius: 1.5,
        overflow: 'hidden',
        position: 'relative',
        height: { xs: 320, md: 560 },
        ...sx,
      }}
      {...other}
    >
      <Map
        mapStyle={`mapbox://styles/mapbox/${theme.palette.mode === 'light' ? 'light' : 'dark'}-v10`}
        initialViewState={{
          latitude: 41.2995,
          longitude: 69.2401,
          zoom: 12,
        }}
      >
        <MapControl hideGeolocate />

        {contacts.map((country, index) => (
          <MapMarker
            key={`marker-${index}`}
            latitude={country.latlng[0]}
            longitude={country.latlng[1]}
            onClick={(event) => {
              event.originalEvent.stopPropagation();
              setPopupInfo(country);
            }}
          />
        ))}

        {popupInfo && (
          <MapPopup
            longitude={popupInfo.latlng[1]}
            latitude={popupInfo.latlng[0]}
            onClose={() => setPopupInfo(null)}
          >
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              Address
            </Typography>

            <Typography component="div" variant="caption">
              {popupInfo.address}
            </Typography>

            <Typography
              component="div"
              variant="caption"
              sx={{ mt: 1, display: 'flex', alignItems: 'center' }}
            >
              <Iconify icon="solar:phone-bold" width={14} sx={{ mr: 0.5 }} />
              {popupInfo.phoneNumber}
            </Typography>
          </MapPopup>
        )}
      </Map>
    </Box>
  );
}
