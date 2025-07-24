'use client'

import React from 'react';
import {
  Box,
  Button,

  Typography,
  Stack,
  Paper,

} from '@mui/material';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import Logo from '@/public/dark_logo.png';
import { useRouter } from 'next/navigation';
import { useWindowSize } from '@/context/window_size';



const FullscreenCenter = styled(Box)({
  minHeight: '100vh',
  background: 'linear-gradient(to bottom right, #0f1c2e, #1a2a44)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
});

const WelcomeCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: 24,
  backgroundColor: '#fdfaf6',
  direction: 'rtl',
  width: '100%',
  maxWidth: 650,
  textAlign: 'center',
  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
}));

const WelcomePage = () => {
  const router = useRouter();
  const { isMobile } = useWindowSize();


  return (

    <FullscreenCenter dir="rtl">

      <WelcomeCard elevation={12}>

        <Stack
          spacing={isMobile ? 3 : 5} alignItems="center">
          <Image
            src={Logo}
            alt="לוגו Check My Desk"
            width={isMobile ? 80 : 100}
            height={isMobile ? 80 : 100}
            style={{ filter: 'drop-shadow(0 0 6px #007aff)' }}
          />
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            fontWeight="bold"
          >
            ברוכים הבאים אל
          </Typography>
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            fontWeight="bold"
          >
            Check My Desk
          </Typography>
          <Typography
            variant={isMobile ? 'body2' : 'body1'}
            color="text.secondary"
            fontWeight="bold"
            sx={{ px: isMobile ? 1 : 4 }}
          >
            ניהול חכם של תקלות, קריאות שירות, וכל מה שביניהם — במקום אחד, פשוט ונוח.
          </Typography>


          <Button
            variant="contained"
            color="primary"
            size={isMobile ? 'medium' : 'large'}
            fullWidth={isMobile}
            onClick={() => router.push('service-calls')}
          >
            פתח קריאת שירות חדשה
          </Button>

          <Button

            variant="contained"
            color="primary"
            size={isMobile ? 'medium' : 'large'}
            fullWidth={isMobile}
            onClick={() => router.push('auth/signin')}
          >
            התחברות 
          </Button>

        </Stack>


      </WelcomeCard>
    </FullscreenCenter>

  );
};

export default WelcomePage;
