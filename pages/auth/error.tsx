'use client'

import React from 'react';
import {
  Box,
  Button,
  Typography,
  Stack,
  Paper,
  CssBaseline,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Logo from '@/public/dark_logo.png';

const CenteredPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: 20,
  maxWidth: 500,
  width: '100%',
  textAlign: 'center',
  backgroundColor: '#fff',
  direction: 'rtl',
}));

const AccessDenied = () => {
  const router = useRouter();

  return (
    <>
      <CssBaseline />
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#f0f2f5"
        px={2}
      >
        <CenteredPaper elevation={8}>
          <Stack spacing={4} alignItems="center">
            <Image
              src={Logo}
              alt="לוגו Check My Desk"
              width={70}
              height={70}
              style={{ filter: 'drop-shadow(0 0 4px #007aff)' }}
            />

            <Typography variant="h5" fontWeight="bold" color="error">
              אין לך גישה
            </Typography>

            <Typography variant="body1" color="text.secondary">
              ייתכן שאין לך הרשאות מתאימות לגשת לעמוד זה. אם אתה חושב שזו טעות, צור קשר עם מנהל המערכת.
            </Typography>

            <Button variant="contained" color="primary" onClick={() => router.push('/')}>
              חזרה לדף הבית
            </Button>
          </Stack>
        </CenteredPaper>
      </Box>
    </>
  );
};

export default AccessDenied;
