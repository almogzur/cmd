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
import { signIn } from 'next-auth/react';
import { useWindowSize } from '@/context/window_size';
import InputWrap from '@/components/mui-wrappers/input-wrap';
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

const NewUser = () => {
  const { isMobile } = useWindowSize();
  const router = useRouter()

  const [userInfo, setUserInfo] = useState({
    email: '',
    name: '',
    phone:''
  })


  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    try {
      // 1. Create user in DB
      const res = await fetch('/api/user/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userInfo.email, name: userInfo.name , phone: userInfo.phone }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        alert(message || 'אירעה שגיאה ביצירת המשתמש')
      }

      // 2. Trigger magic link
      const result = await signIn('email', {
        email: userInfo.email,
        callbackUrl: '/',
        redirect: false,
      });

      if (result?.ok) {
        setSubmitted(true);
        setUserInfo({ email: '', name: '' , phone: ''});
      }
      else {
        alert('שגיאה בשליחת הקישור, נסה שוב.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert(err || 'אירעה שגיאה.');
    }
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
          onClick={()=>{router.push('/')}}
        />

        <Stack spacing={isMobile ? 3 : 5} alignItems="center">

          <Image
            src={Logo}
            alt="לוגו Check My Desk"
            width={isMobile ? 80 : 100}
            height={isMobile ? 80 : 100}
            style={{ filter: 'drop-shadow(0 0 6px #007aff)' }}
          />

          {submitted ?
            <>
              <Typography
                variant={isMobile ? 'h5' : 'h4'}
              >
                {' ברוכים הבאים '}
              </Typography>

              <Typography
                variant={isMobile ? 'h5' : 'h4'}
              >
                {userInfo.email}
              </Typography>
            </>
            :
            <Typography variant={isMobile ? 'h5' : 'h4'} fontWeight="bold">
              הצטרפו אלינו
            </Typography>


          }

          {!submitted &&
            <Typography
              variant={isMobile ? 'body2' : 'body1'}
              color="text.secondary"
              fontWeight="bold"
              sx={{ px: isMobile ? 1 : 4 }}
            >
              מלאו את הפרטים  שלכם ואנחנו נשלח לכם קישור התחברות למייל – בלי סיסמה, בלי כאב ראש.
            </Typography>
          }

          {submitted ?
            <Typography
              variant={isMobile ? 'h6' : 'h5'} align="center" color="primary">
              נשלח קישור התחברות לאימייל שלך.
            </Typography>
            :
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ width: '100%', mt: 2 }}
            >
              <Stack spacing={2}>

                <InputWrap
                  label="שם"
                  variant="standard"
                  fullWidth
                  type="text"
                  value={userInfo.name}
                  onChangeHandler={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  required
                />

                <InputWrap
                  label="אימייל"
                  fullWidth
                  type="email"
                  value={userInfo.email}
                  onChangeHandler={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  required
                  variant="standard"
                />

                <InputWrap
                value={userInfo.phone}
                onChangeHandler={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                  label="טלפון"
                  fullWidth
                  type="tel"
                  variant="standard"
                  
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size={isMobile ? 'medium' : 'large'}
                  fullWidth={isMobile}
                >
                  שלח קישור התחברות
                </Button>
              </Stack>
            </Box>
          }
        </Stack>

      </StyledCard>
    </FullscreenCenter>
  );
};

export default NewUser;
