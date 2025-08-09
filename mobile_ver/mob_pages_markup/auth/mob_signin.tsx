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

// Shared layout styles from MobileHome
const FullscreenLayout = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: 'linear-gradient(to bottom right, #0f1c2e, #1a2a44)',
  direction: 'rtl',
  padding: '1rem',
});

const TopPanel = styled(Box)(({ theme }) => ({
  flex: '0 0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: theme.spacing(2),
}));

const BottomPanel = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: '#fdfaf6',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 24,
  padding: theme.spacing(2),
  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
}));

const StyledCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 24,
  backgroundColor: '#fdfaf6',
  direction: 'rtl',
  width: '100%',
  maxWidth: 650,
  textAlign: 'center',
  boxShadow: 'none',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const MobilSignInPage = () => {
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
    <FullscreenLayout dir="rtl">
      <TopPanel>
        <Image
          src={Logo}
          alt="לוגו Check My Desk"
          width={70}
          height={70}
          style={{ filter: 'drop-shadow(0 0 6px #fff)' }}
        />
      </TopPanel>

      <BottomPanel>
        <StyledCard elevation={0}>
          <CloseIcon
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              cursor: 'pointer',
              scale: 1.5,
            }}
            onClick={() => router.push('/')}
          />

          <Stack spacing={3} alignItems="center">
            <Typography variant="h5" fontWeight="bold">
              התחברות ל־Check My Desk
            </Typography>

            <Typography
              fontSize={'1.2rem'}
              color="text.secondary"
              fontWeight="bold"
              sx={{ px: 1 }}
            >
              הזינו את כתובת האימייל שלכם ואנו נשלח לכם קישור התחברות .
            </Typography>

            <Box sx={{ width: '100%', mt: 2 }}>
              <Stack spacing={2}>
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
            </Box>
          </Stack>
        </StyledCard>
      </BottomPanel>
    </FullscreenLayout>
  );
};

export default MobilSignInPage;
