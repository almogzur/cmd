'use client';

import React from 'react';
import { Box, Typography, Link, Stack, IconButton, useTheme, colors } from '@mui/material';
import { FaFacebookF } from 'react-icons/fa';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const UserFooter: React.FC = () => {

  const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: theme.palette.primary.main,
        borderTop: '1px solid #e0e0e0',
        px: { xs: 2, sm: 4 },
        py: 2,
        direction: 'rtl',
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-around"
        alignItems="center"
        spacing={{ xs: 1, sm: 0 ,}}
      >
        <Typography 
           variant="body2"
            sx={{color:'#fff', }}

            >
          &copy; {new Date().getFullYear()} Check My Desk  (MIGO)- כל הזכויות שמורות
        </Typography>

        <Stack direction="row" spacing={3} alignItems="center">
          <Link
            href="https://www.facebook.com/profile.php?id=61578252779932"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: 'flex', alignItems: 'center',}}
          >
            <IconButton size="large" sx={{ color: '#1877f2' }}>
              <FaFacebookF />
            </IconButton>

            <Typography 
              variant="body2"
              sx={{color:'#fff'}}
              >עקבו אחרינו בפייסבוק</Typography>
          </Link>

          <Link
            href="mailto:support@yourdomain.com"
            sx={{ display: 'flex', alignItems: 'center', color: 'inherit' }}
          >
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <MailOutlineIcon fontSize="large" />
            </IconButton>
            <Typography sx={{color:'#fff'}} variant="body2">תמיכה טכנית</Typography>
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default UserFooter;
