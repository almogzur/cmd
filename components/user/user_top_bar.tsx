// components/UserNavbar.tsx
'use client';
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import NewCallDialog from './new_call_dialog';
import {signIn} from 'next-auth/react'

const UserTopNavbar: React.FC = () => {
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

        <Stack direction="row" spacing={2}>
          
        <NewCallDialog/>

          <Button sx={{ color: '#fff', fontWeight: 500 }}>

          </Button>

          <Button
             sx={{ color: '#fff', fontWeight: 500 }}
             onClick={() => {
               signIn()
             }}
             >
            התחברות אדמין  
          </Button>

        </Stack>
      </Toolbar>

    </AppBar>
  );
};

export default UserTopNavbar;
