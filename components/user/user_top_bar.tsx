// components/UserNavbar.tsx
'use client';
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import NewCallDialog from './new_call_dialog';
import { useRouter } from 'next/router';
import { FaPowerOff } from "react-icons/fa";
import { signOut } from 'next-auth/react';

const UserTopNavbar: React.FC = () => {

  const router = useRouter();

  return (
    <AppBar
      position="static"
      sx={{
        direction: 'rtl',
        backgroundColor: '#1d2d50',

      }}
    >
      <Toolbar>
        <Link href={'/'}>
        <Image 
            src={'/light_logo.png'}
            width={60}
            height={60}
            style={{ marginLeft: '10px' }}
            
            alt={''}
            />
          </Link>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 600 , color: '#fff' }}
        >
          רשומות השירות הפעילות שלי
        </Typography>

        <Stack 
          direction="row"
           spacing={2}
           alignItems={'center'}
           >
          
        <NewCallDialog/>

          <Button
           sx={{ color: '#fff', fontWeight: 500 }}
           variant='contained'
           onClick={() => {
            router.push('/user/main');
           }}
           >
            הקריאות  שלי 
          </Button>

         <Button
         
         >
          <FaPowerOff
           style={{ color: 'red', cursor: 'pointer' }}
           onClick={() => {
             signOut()
           }}
          />
          </Button>


        </Stack>
      </Toolbar>

    </AppBar>
  );
};

export default UserTopNavbar;
