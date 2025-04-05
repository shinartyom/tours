import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import { Stack, IconButton } from '@mui/material';

import { _socials } from 'src/_mock';
import { CONFIG } from 'src/config-global';
import { varAlpha, bgGradient } from 'src/theme/styles';
import { TwitterIcon, FacebookIcon, LinkedinIcon, InstagramIcon } from 'src/assets/icons';

import { varFade, AnimateText, MotionContainer, animateTextClasses } from 'src/components/animate';

// ----------------------------------------------------------------------

export function ContactHero({ sx, ...other }: BoxProps) {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        ...bgGradient({
          color: `0deg, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.8)}, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.8)}`,
          imgUrl: `${CONFIG.assetsDir}/assets/images/contact/hero.webp`,
        }),
        height: { md: 360 },
        py: { xs: 10, md: 0 },
        overflow: 'hidden',
        position: 'relative',
        ...sx,
      }}
      {...other}
    >
      <Container component={MotionContainer}>
        <Box
          sx={{
            bottom: { md: 40 },
            position: { md: 'absolute' },
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <AnimateText
            component="h1"
            variant="h1"
            text={['Contact', 'us conveniently']}
            variants={varFade({ distance: 24 }).inUp}
            sx={{
              color: 'common.white',
              [`& .${animateTextClasses.line}[data-index="0"]`]: {
                [`& .${animateTextClasses.word}[data-index="0"]`]: { color: 'primary.main' },
              },
            }}
          />

          <Stack
            direction="row"
            sx={{
              mt: 2,
            }}
            gap={4}
          >
            {_socials.map((social) => (
              <IconButton
                key={social.label}
                size="large"
                sx={{ width: 60, height: 60 }}
                color="inherit"
                onClick={() => window.open(social.path, '_blank')}
              >
                {social.value === 'twitter' && <TwitterIcon sx={{ width: 35, height: 35 }} />}
                {social.value === 'facebook' && <FacebookIcon sx={{ width: 35, height: 35 }} />}
                {social.value === 'instagram' && <InstagramIcon sx={{ width: 35, height: 35 }} />}
                {social.value === 'linkedin' && <LinkedinIcon sx={{ width: 35, height: 35 }} />}
              </IconButton>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
