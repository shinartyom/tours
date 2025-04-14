import type { BoxProps } from '@mui/material/Box';

import { useState } from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionDetails, { accordionDetailsClasses } from '@mui/material/AccordionDetails';
import AccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';

import { useRouter } from 'src/routes/hooks';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SectionTitle } from '../section-title';
import { FloatLine, FloatPlusIcon, FloatTriangleDownIcon } from '../svg-elements';

// ----------------------------------------------------------------------

const FAQs = [
  {
    question: 'How can I book a tour package?',
    answer: (
      <Typography>
        You can book a tour package by visiting our office, contacting us via phone, or using our
        online booking system. For online bookings, simply select your desired package, fill in the
        required details, and make the payment to confirm your booking.
      </Typography>
    ),
  },
  {
    question: 'What documents are required for booking an international tour?',
    answer: (
      <Box component="ul" sx={{ pl: 3, listStyleType: 'disc' }}>
        <li> A valid passport with at least 6 months of validity remaining.</li>
        <li> A completed visa application form (if applicable).</li>
        <li> Recent passport-sized photographs.</li>
        <li>
          {' '}
          Any additional documents required by the destination country (e.g., proof of income,
          travel insurance).
        </li>
      </Box>
    ),
  },
  {
    question: 'Can I customize my tour package?',
    answer: (
      <Typography>
        Yes, we offer customizable tour packages to meet your specific needs. You can choose your
        preferred destinations, accommodations, and activities. Contact our team to discuss your
        requirements and create a personalized itinerary.
      </Typography>
    ),
  },
  {
    question: 'What payment methods do you accept?',
    answer: (
      <Typography>
        We accept various payment methods, including cash, bank transfers, and major credit/debit
        cards. For online bookings, secure payment options are available through our website.
      </Typography>
    ),
  },
  {
    question: 'What happens if I need to cancel my booking?',
    answer: (
      <Typography>
        If you need to cancel your booking, please contact us as soon as possible. Cancellation
        policies vary depending on the tour package and the time of cancellation. Refunds, if
        applicable, will be processed according to the terms and conditions of your booking.
      </Typography>
    ),
  },
  {
    question: 'Do you provide travel insurance?',
    answer: (
      <Typography>
        Yes, we offer travel insurance options to ensure your safety and peace of mind during your
        trip. Travel insurance covers medical emergencies, trip cancellations, lost luggage, and
        more. Contact us for more details on available plans.
      </Typography>
    ),
  },
  {
    question: 'Are flights included in the tour packages?',
    answer: (
      <Typography>
        Some of our tour packages include flights, while others do not. Please check the details of
        the specific package you are interested in or contact our team for clarification.
      </Typography>
    ),
  },
  {
    question: 'Do you assist with visa applications?',
    answer: (
      <Typography>
        Yes, we provide assistance with visa applications for most destinations. Our team will guide
        you through the process and provide the necessary documentation to support your application.
      </Typography>
    ),
  },
];

// ----------------------------------------------------------------------

export function FaqsView({ sx, ...other }: BoxProps) {
  const [expanded, setExpanded] = useState<string | false>(FAQs[0].question);
  const router = useRouter();

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const renderDescription = (
    <SectionTitle
      caption="FAQs"
      title="We’ve got the"
      txtGradient="answers"
      sx={{ textAlign: 'center' }}
    />
  );

  const renderContent = (
    <Stack
      spacing={1}
      sx={{
        mt: 8,
        mx: 'auto',
        maxWidth: 720,
        mb: { xs: 5, md: 8 },
      }}
    >
      {FAQs.map((item, index) => (
        <Accordion
          key={item.question}
          component={m.div}
          variants={varFade({ distance: 24 }).inUp}
          expanded={expanded === item.question}
          onChange={handleChange(item.question)}
          sx={{
            borderRadius: 2,
            transition: (theme) =>
              theme.transitions.create(['background-color'], {
                duration: theme.transitions.duration.short,
              }),
            '&::before': { display: 'none' },
            '&:hover': {
              bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
            },
            '&:first-of-type, &:last-of-type': { borderRadius: 2 },
            [`&.${accordionClasses.expanded}`]: {
              m: 0,
              borderRadius: 2,
              boxShadow: 'none',
              bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
            },
            [`& .${accordionSummaryClasses.root}`]: {
              py: 3,
              px: 2.5,
              minHeight: 'auto',
              [`& .${accordionSummaryClasses.content}`]: {
                m: 0,
                [`&.${accordionSummaryClasses.expanded}`]: { m: 0 },
              },
            },
            [`& .${accordionDetailsClasses.root}`]: { px: 2.5, pt: 0, pb: 3 },
          }}
        >
          <AccordionSummary
            expandIcon={
              <Iconify
                width={20}
                icon={expanded === item.question ? 'mingcute:minimize-line' : 'mingcute:add-line'}
              />
            }
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Typography variant="h6"> {item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>{item.answer}</AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );

  const renderContact = (
    <Stack
      alignItems="center"
      sx={{
        px: 3,
        py: 8,
        textAlign: 'center',
        background: (theme) =>
          `linear-gradient(270deg, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}, ${varAlpha(theme.vars.palette.grey['500Channel'], 0)})`,
      }}
    >
      <m.div variants={varFade().in}>
        <Typography variant="h4">Still have questions?</Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <Typography sx={{ mt: 2, mb: 3, color: 'text.secondary' }}>
          Please describe your case to receive the most accurate advice
        </Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <Button
          color="inherit"
          variant="contained"
          onClick={() => router.push('/contact-us')}
          startIcon={<Iconify icon="fluent:mail-24-filled" />}
        >
          Contact us
        </Button>
      </m.div>
    </Stack>
  );

  return (
    <Box component="section" sx={{ ...sx }} {...other}>
      <MotionViewport sx={{ py: 10, position: 'relative' }}>
        <TopLines />

        <Container>
          {renderDescription}
          {renderContent}
        </Container>

        <Stack sx={{ position: 'relative' }}>
          <BottomLines />
          {renderContact}
        </Stack>
      </MotionViewport>
    </Box>
  );
}

// ----------------------------------------------------------------------

function TopLines() {
  return (
    <>
      <Stack
        spacing={8}
        alignItems="center"
        sx={{
          top: 64,
          left: 80,
          position: 'absolute',
          transform: 'translateX(-15px)',
        }}
      >
        <FloatTriangleDownIcon sx={{ position: 'static', opacity: 0.12 }} />
        <FloatTriangleDownIcon
          sx={{
            position: 'static',
            opacity: 0.24,
            width: 30,
            height: 15,
          }}
        />
      </Stack>
      <FloatLine vertical sx={{ top: 0, left: 80 }} />
    </>
  );
}

function BottomLines() {
  return (
    <>
      <FloatLine sx={{ top: 0, left: 0 }} />
      <FloatLine sx={{ bottom: 0, left: 0 }} />
      <FloatPlusIcon sx={{ top: -8, left: 72 }} />
      <FloatPlusIcon sx={{ bottom: -8, left: 72 }} />
    </>
  );
}
