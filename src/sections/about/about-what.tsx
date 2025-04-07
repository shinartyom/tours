import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { fPercent } from 'src/utils/format-number';

import { CONFIG } from 'src/config-global';
import { varAlpha, stylesMode } from 'src/theme/styles';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export const SKILLS = [...Array(3)].map((_, index) => ({
  label: ['Customer Satisfaction', 'Destination Expertise', 'Seamless Planning'][index],
  value: [90, 85, 95][index],
}));

// ----------------------------------------------------------------------

export function AboutWhat({ sx, ...other }: BoxProps) {
  return (
    <Box component="section" sx={{ overflow: 'hidden', ...sx }} {...other}>
      <Container
        component={MotionViewport}
        sx={{
          py: { xs: 10, md: 15 },
          pb: { xs: 0, md: 0 },
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        <Grid container columnSpacing={{ md: 3 }} alignItems="flex-start">
          <Grid
            container
            xs={12}
            md={6}
            lg={7}
            alignItems="center"
            sx={{
              pr: { md: 7 },
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <Grid xs={6}>
              <m.div variants={varFade().inUp}>
                <Image
                  alt="Travel Experience"
                  src={`${CONFIG.assetsDir}assets/images/mock/travel/travel-16.webp`}
                  ratio="1/1"
                  sx={(theme) => ({
                    borderRadius: 3,
                    boxShadow: `-40px 40px 80px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.24)}`,
                    [stylesMode.dark]: {
                      boxShadow: `-40px 40px 80px ${varAlpha(theme.vars.palette.common.blackChannel, 0.24)}`,
                    },
                  })}
                />
              </m.div>
            </Grid>

            <Grid xs={6}>
              <m.div variants={varFade().inUp}>
                <Image
                  alt="Global Destinations"
                  src={`${CONFIG.assetsDir}assets/images/mock/travel/travel-15.webp`}
                  ratio="3/4"
                  sx={(theme) => ({
                    borderRadius: 3,
                    boxShadow: `-40px 40px 80px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.24)}`,
                    [stylesMode.dark]: {
                      boxShadow: `-40px 40px 80px ${varAlpha(theme.vars.palette.common.blackChannel, 0.24)}`,
                    },
                  })}
                />
              </m.div>
            </Grid>
          </Grid>

          <Grid xs={12} md={6} lg={5}>
            <m.div variants={varFade().inRight}>
              <Typography variant="h2" sx={{ mb: 3 }}>
                Why Choose Tours.uz?
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography
                sx={{ color: 'text.secondary', [stylesMode.dark]: { color: 'common.white' } }}
              >
                At Tours.uz, we specialize in creating unforgettable international travel
                experiences. With our deep knowledge of global destinations, seamless planning, and
                commitment to customer satisfaction, we ensure every journey is extraordinary.
              </Typography>
            </m.div>

            <Box gap={3} display="flex" flexDirection="column" sx={{ my: 5 }}>
              {SKILLS.map((progress, index) => (
                <Box component={m.div} key={progress.label} variants={varFade().inRight}>
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{ mb: 1, color: 'text.secondary', typography: 'body2' }}
                  >
                    <Typography variant="subtitle2" sx={{ flexGrow: 1, color: 'text.primary' }}>
                      {progress.label}
                    </Typography>
                    {fPercent(progress.value)}
                  </Box>

                  <LinearProgress
                    color={(index === 0 && 'primary') || (index === 1 && 'warning') || 'error'}
                    variant="determinate"
                    value={progress.value}
                  />
                </Box>
              ))}
            </Box>

            <m.div variants={varFade().inRight}>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
              >
                Explore Our Tours
              </Button>
            </m.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
