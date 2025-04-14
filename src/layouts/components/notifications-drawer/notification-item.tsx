import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Chip, Typography } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';

import { CONFIG } from 'src/config-global';

import type { Notifications } from './index';

// ----------------------------------------------------------------------

export function NotificationItem({ notification }: { notification: Notifications }) {
  const renderAvatar = (
    <ListItemAvatar>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: 'background.neutral' }}
      >
        <Box
          component="img"
          src={`${CONFIG.assetsDir}/assets/icons/notification/ic-chat.svg`}
          sx={{ width: 24, height: 24 }}
        />
      </Stack>
    </ListItemAvatar>
  );

  const renderText = (
    <ListItemText
      disableTypography
      primary={reader(notification.subject)}
      secondary={
        <Typography fontSize={14} fontWeight={400}>
          {notification.message}
        </Typography>
      }
    />
  );

  const action = (
    <Stack spacing={1} direction="row" sx={{ mt: 1.5 }}>
      <Button size="small" variant="contained">
        Contact
      </Button>
    </Stack>
  );

  return (
    <ListItemButton
      disableRipple
      sx={{
        p: 2.5,
        alignItems: 'flex-start',
        borderBottom: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
      }}
    >
      {renderAvatar}

      <Stack sx={{ flexGrow: 1 }}>
        {renderText}
        <Box display="flex" gap={2} my={1}>
          {notification.phoneNumber && <Chip color="primary" label={notification.phoneNumber} />}
          {notification.email && <Chip color="secondary" label={notification.email} />}
        </Box>
        {action}
      </Stack>
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function reader(data: string) {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: data }}
      sx={{
        mb: 0.5,
        '& p': { typography: 'body2', m: 0 },
        '& a': { color: 'inherit', textDecoration: 'none' },
        '& strong': { typography: 'subtitle2' },
      }}
    />
  );
}
