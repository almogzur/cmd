// components/UserNavbar.tsx
'use client';
import React from 'react';
import { AppBar, Typography, Button, Stack } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { signOut } from 'next-auth/react';
import NewCallDialog from '@/components/buttons/new_call_dialog';

import Settings  from '@mui/icons-material/Settings';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const UserTopNavbar: React.FC = () => {



  return (
    <AppBar
      sx={{
        direction: 'rtl',
        position: 'inherit',
        width: '100%',
      }}
    >

      <Stack
        direction={'row' }
        alignItems={'center'}
        justifyContent={'space-between'}
        spacing={1}
      >

        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-around'}
          gap={1}
 
        >

          <Link href={'/'}>
            <Image
              src={'/light_logo.png'}
              width={60}
              height={60}
              alt={''}
            />
          </Link>

          <Typography
          variant='body2'
            sx={{ flexGrow: 1, fontWeight: 600, color: '#fff' }}
          >
            רשומות  פעילות
          </Typography>

        </Stack>


        <Stack
          direction="row"
          alignItems={'center'}
          gap={2}
          p={2}
        >

          <NewCallDialog
            btnProps={{
              size:  'small',
            }}
          />

          
          <Settings 
            sx={{color:'white', scale: 1.5}}
            />


          <PowerSettingsNewIcon
            style={{ color: 'red', cursor: 'pointer', scale: 1.5 }}
            onClick={() => {
              signOut()
            }}
          />



        </Stack>

      </Stack>

    </AppBar>
  );
};

export default UserTopNavbar;
