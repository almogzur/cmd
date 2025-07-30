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
import InputWrap from '@/components/mui-wrappers/input-wrap';
import { signIn } from "next-auth/react";
import { useWindowSize } from '@/context/window_size';
import { IoMdClose } from "react-icons/io";
import { useRouter } from 'next/router';

const FullscreenCenter = styled(Box)({
  minHeight: '100vh',
  background: 'linear-gradient(to bottom right, #0f1c2e, #1a2a44)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
});

const StyledCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: 24,
  backgroundColor: '#fdfaf6',
  direction: 'rtl',
  width: '100%',
  maxWidth: 650,
  textAlign: 'center',
  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
}));

const SignInPage = () => {
  const { isMobile } = useWindowSize();
  const router = useRouter();

  const [user, setUser] = useState({
    email: '',
    role: 'USER',
  });

  const handleSignIn = () => {
    signIn("email", {
      email: user.email,
      callbackUrl: user.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard',
    });
  };

  return (
    <FullscreenCenter dir="rtl">
      <StyledCard elevation={12} sx={{ position: 'relative' }}>
        <IoMdClose
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            cursor: 'pointer',
            scale: 2,
          }}
          onClick={() => { router.push('/') }}
        />

        <Stack spacing={isMobile ? 3 : 5} alignItems="center">
          <Image
            src={Logo}
            alt="לוגו Check My Desk"
            width={isMobile ? 80 : 100}
            height={isMobile ? 80 : 100}
            style={{ filter: 'drop-shadow(0 0 6px #007aff)' }}
          />

          <Typography variant={isMobile ? 'h5' : 'h4'} fontWeight="bold">
            התחברות ל־Check My Desk
          </Typography>

          <Typography
            variant={isMobile ? 'body2' : 'body1'}
            color="text.secondary"
            fontWeight="bold"
            sx={{ px: isMobile ? 1 : 4 }}
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
                size={isMobile ? 'medium' : 'large'}
                fullWidth={isMobile}
                onClick={handleSignIn}
              >
                שלח קישור התחברות
              </Button>
            </Stack>
          </Box>
        </Stack>
      </StyledCard>
    </FullscreenCenter>
  );
};

export default SignInPage;
