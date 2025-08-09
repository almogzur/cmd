'use client';

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Box, Paper, Typography } from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Logo from "@/public/dark_logo.png";
import NewCallDialog from "@/components/buttons/new_call_dialog";

// Layout like DesktopHome
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

export default function MobileHome() {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <FullscreenLayout dir="rtl">
      
      <TopPanel>
        <Stack spacing={2} alignItems="center">
          <Image
            src={Logo}
            alt="לוגו Check My Desk"
            width={70}
            height={70}
            style={{ filter: 'drop-shadow(0 0 6px #fff)' }}
          />
          <Typography variant="h5" color="#fff" fontWeight="bold">
            ברוכים הבאים
          </Typography>
        </Stack>
      </TopPanel>

      <BottomPanel>
        <StyledCard elevation={0}>


          <Stack spacing={3} alignItems="center">
            {session?.user?.name && (
              <Typography variant="h6">{session.user.name}</Typography>
            )}

            <Typography variant="h5" fontWeight="bold">
              Check My Desk
            </Typography>

            <Typography
              fontSize={'1.3rem'}
              color="text.secondary"
              fontWeight="bold"
              sx={{ px: 1 }}
            >
              ניהול חכם של תקלות, קריאות שירות, וכל מה שביניהם — במקום אחד, פשוט ונוח.
            </Typography>

            <Stack
              direction="row"
              flexWrap="wrap"
              justifyContent="center"
              gap={2}
              sx={{ width: '100%' }}
            >
              {status === 'unauthenticated' && (
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => router.push('auth/new-user')}
                  size="large"
                >
                  צור משתמש חדש
                </Button>
              )}

              {session?.user.role === 'USER' && (
                <>
                  <NewCallDialog 
                  btnProps={{
                     fullWidth: true ,
                     title: 'צור קריאה',

                    }} 
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => router.push('user')}
                  >
                    צפה בקריאות שלי
                  </Button>
                </>
              )}

              {session?.user.role === 'ADMIN' && (
                <>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => router.push('admin')}
                >
                  ניהול קריאות שלי
                </Button>
               <NewCallDialog 
                  btnProps={{
                     fullWidth: true ,
                     title: 'צור קריאה',

                    }} 
                  />
                </>

              )}

              {session?.user.role === 'TECHNICIAN' && (
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => router.push('technician')}
                >
                  ניהול קריאות 
                </Button>
              )}

              {status === 'unauthenticated' ? (
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => router.push('auth/signin')}
                >
                  התחברות
                </Button>
              ) : (
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => signOut()}
                >
                  התנתק {session?.user?.email}
                </Button>
              )}
            </Stack>
          </Stack>
        </StyledCard>
      </BottomPanel>
    </FullscreenLayout>
  );
}
