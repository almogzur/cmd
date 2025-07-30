import NewCallDialog from "@/components/user/new_call_dialog";
import { useWindowSize } from "@/context/window_size";
import { Stack, Typography, Button, Box, Paper, styled } from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import Logo from '@/public/dark_logo.png';



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

export default function Home() {

  const router = useRouter();
  const { isMobile } = useWindowSize();

  const { data: session, status } = useSession()

  return (
    <>
      <Head>
        <title>Check My Desk</title>
        <meta name="description" content="Check My Desk" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/light_logo.png" />
      </Head>

      <FullscreenCenter dir="rtl">

        <WelcomeCard elevation={12} sx={{ position: 'relative' }}>

          {status === 'authenticated' &&
            <FaUser
              style={{ position: 'absolute', top: 20, left: 20, cursor: 'pointer', scale: 2 }}
              onClick={() => router.push('/profile')}
            />
          }


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
              ברוכים הבאים
            </Typography>

            {session?.user.name &&
              <Typography
                variant='h5'
              >{session.user.name}
              </Typography>
            }

            <Typography
              variant={isMobile ? 'h5' : 'h4'}
              fontWeight="bold"
            >
              Check My Desk
            </Typography>

            <Typography
              variant={isMobile ? 'body1' : 'h6'}
              color="text.secondary"
              fontWeight="bold"
              sx={{ px: isMobile ? 1 : 4 }}
            >
              ניהול חכם של תקלות, קריאות שירות, וכל מה שביניהם — במקום אחד, פשוט ונוח.
            </Typography>

            <Stack
              direction={isMobile ? 'column' : 'row'}
              gap={2}
            >
              {status === 'unauthenticated' &&
                <Button variant='contained' onClick={() => router.push('auth/new-user')} size='large'>
                  צור משתמש חדש
                </Button>
              }
              {session?.user.role === 'USER' ?
                <>
                  <NewCallDialog />
                  <Button
                    variant='contained'
                    onClick={() => router.push('user/main')}
                  >
                    צפה בקריאות שלי
                  </Button>

                </>

                : session?.user.role === 'ADMIN' &&
                <Button
                  onClick={() => router.push('admin/main')}
                  variant='contained'>
                  ניהול קריאות שלי
                </Button>
              }


              {
                status === 'unauthenticated' ?
                  <Button
                    variant="contained"
                    color="primary"
                    size={isMobile ? 'medium' : 'large'}

                    onClick={() => router.push('auth/signin')}
                  >
                    התחברות
                  </Button>
                  :
                  <Button
                    variant='outlined'
                    onClick={() => signOut()}
                  >
                    התנתק   {session?.user?.email}
                  </Button>
               }

            </Stack>

          </Stack>


        </WelcomeCard>
      </FullscreenCenter>

    </>
  );
}
