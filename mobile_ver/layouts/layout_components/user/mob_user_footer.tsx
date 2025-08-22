'use client';

import React from 'react';
import {
  Box,
  Typography,
  Link,
  Stack,
  IconButton,
  useTheme,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useThemeContext } from '@/context/theme_context';


const UserFooter: React.FC = () => {
  const theme = useTheme();
  const { bgColor , textColor}= useThemeContext()

  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: bgColor,
        borderTop: '1px solid #e0e0e0',
        px: { xs: 2, sm: 4 },
        py: { xs: 1.5, sm: 2 },
        direction: 'rtl',
      }}
    >
      <Stack
        
        justifyContent="space-around"
        alignItems="center"
        spacing={ 1 }
        textAlign={ 'center'}
        sx={{
          '& .MuiTypography-root': {
            color: textColor,
          },
        }}

      >
        <Typography
          variant="body2"
          
          sx={{
            color: '#fff',
            fontSize: '0.75rem',
          }}
        >

          &copy; {new Date().getFullYear()} Check My Desk (MIGO) - כל הזכויות שמורות
        </Typography>

        <Stack direction={'row'}
          
          spacing={ 1}
          alignItems="center"
        >
          <Link
            href="https://www.facebook.com/profile.php?id=61578252779932"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <IconButton size="small" sx={{ color: '#1877f2' }}>
              <FacebookIcon />
            </IconButton>
            <Typography variant="body2" sx={{ color: '#fff' }}>
              עקבו אחרינו בפייסבוק
            </Typography>
          </Link>

          <Link
            href="mailto:support@yourdomain.com"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <IconButton size="small" sx={{ color: '#90caf9' }}>
              <MailOutlineIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" sx={{ color: '#fff' }}>
              תמיכה טכנית
            </Typography>
          </Link>

        </Stack>

      </Stack>
    </Box>
  );
};

export default UserFooter;
