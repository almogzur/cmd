'use client';

import React from 'react';
import {
  Box,
  Button,
  Typography,
  Stack,
  Paper
} from '@mui/material';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import Logo from '@/public/dark_logo.png';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

import NewCallDialog from '@/components/buttons/new_call_dialog';

const FullscreenLayout = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  background: 'linear-gradient(to bottom right, #0f1c2e, #1a2a44)',
  direction: 'rtl'
});

const LeftPanel = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(6)
}));

const RightPanel = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: '#fdfaf6',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  padding: theme.spacing(6)
}));

const StyledCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: 24,
  backgroundColor: '#fdfaf6',
  maxWidth: 500,
  width: '100%',
  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
  direction: 'rtl'
}));

export default function DesktopHome() {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <FullscreenLayout>
      
      <LeftPanel>
        <Stack spacing={4} alignItems="center">
          <Image
            src={Logo}
            alt="Check My Desk Logo"
            width={120}
            height={120}
            style={{ filter: 'drop-shadow(0 0 8px #fff)' }}
          />
          <Typography variant="h4" color="#fff" fontWeight="bold">
            ברוכים הבאים
          </Typography>
          <Typography variant="h6" color="#e0e0e0" sx={{ maxWidth: 400, textAlign: 'center' }}>
            נהל את סביבת העבודה שלך בצורה חכמה ונוחה
          </Typography>
        </Stack>
      </LeftPanel>

      <RightPanel>

        <StyledCard elevation={12}>


          <Stack spacing={3}>
            <Typography variant="h5" fontWeight="bold">
                Check My Desk
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight="bold"
            >
              נהל את סביבת העבודה שלך בצורה חכמה ונוחה.
            </Typography>

            {status === 'unauthenticated' && (
              <>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => router.push('auth/new-user')}
                >
                  צור משתמש חדש
                </Button>
                
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => router.push('auth/signin')}
                >
                  התחברות
                </Button>
              </>
            )}

            {session?.user?.role === 'USER' && (
              <>
                <Typography 
                variant="h6">
                   שלום - {session.user.name}
                  </Typography>

                <NewCallDialog btnProps={{ fullWidth: true ,title: 'צור קריאה חדשה'}}   />

                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => router.push('user')}
                >
                  צפה בקריאות שלי
                </Button>
              </>
            )}

            {session?.user?.role === 'ADMIN' && (
              <>
                <Typography
                 variant="h6">
                   שלום {session.user.name}
                  </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => router.push('admin')}
                >
                  ניהול קריאות שלי
                </Button>
              </>
            )}

            {status === 'authenticated' && (
              <Button
                fullWidth
                variant="outlined"
                onClick={() => signOut()}
              >
                התנתק {session?.user?.email}
              </Button>
            )}

          </Stack>
        </StyledCard>

      </RightPanel>
    </FullscreenLayout>
  );
}
