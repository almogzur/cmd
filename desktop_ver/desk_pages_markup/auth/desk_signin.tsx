'use client';

import React, { useState } from 'react';
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
import { signIn } from "next-auth/react";
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';
import InputWrap from '@/components/inputs/input-wrap';

const FullscreenLayout = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  background: 'linear-gradient(to bottom right, #0f1c2e, #1a2a44)',
  direction: 'rtl',
});

const LeftPanel = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(6),
}));

const RightPanel = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: '#fdfaf6',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  padding: theme.spacing(6),
}));

const StyledCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: 24,
  backgroundColor: '#fdfaf6',
  maxWidth: 500,
  width: '100%',
  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
}));

const DesktopSignInPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: '',
    role: 'USER',
  });

  const handleSignIn = () => {
    signIn("email", {
      email: user.email,
      callbackUrl: user.role === 'ADMIN' ? '/admin/' : '/user/',
    });
  };

  return (
    <FullscreenLayout>
      {/* Branding or Illustration */}
      <LeftPanel>
        <Stack spacing={4} alignItems="center">
          <Image
            src={Logo}
            alt="Check My Desk Logo"
            width={120}
            height={120}
            style={{ filter: 'drop-shadow(0 0 8px #007aff)' }}
          />
          <Typography variant="h4" color="#fff" fontWeight="bold">
            ברוכים הבאים
          </Typography>
          <Typography variant="h6" color="#e0e0e0" sx={{ maxWidth: 400, textAlign: 'center' }}>
            נהל את סביבת העבודה שלך בצורה חכמה ונוחה
          </Typography>
        </Stack>
      </LeftPanel>

      {/* Form Panel */}
      <RightPanel>
        <StyledCard elevation={12}>
          <CloseIcon
            sx={{
              position: 'absolute',
              top: 20,
              left: 20,
              cursor: 'pointer',
              scale: 2,
            }}
            onClick={() => router.push('/')}
          />
          <Stack spacing={3}>
            <Typography variant="h5" fontWeight="bold">
              התחברות ל־Check My Desk
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight="bold"
            >
              הזינו את כתובת האימייל שלכם ואנו נשלח לכם קישור התחברות.
            </Typography>

            <InputWrap
              label="אימייל"
              variant="standard"
              fullWidth
              type="email"
              value={user.email}
              onChangeHandler={(e) => setUser({ ...user, email: e.target.value })}
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="medium"
              fullWidth
              onClick={handleSignIn}
            >
              שלח קישור התחברות
            </Button>
          </Stack>
        </StyledCard>
      </RightPanel>
    </FullscreenLayout>
  );
};

export default DesktopSignInPage;
