'use client';
import { Stack, Box, IconButton, Tooltip, Avatar, Button } from '@mui/material';
import { Home, Assignment, Report, Build } from '@mui/icons-material';
import { useState } from 'react';
import Image from 'next/image';
import { useWindowSize } from '@/context/window_size';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { FaPowerOff } from 'react-icons/fa';
import Person2Icon from '@mui/icons-material/Person2';

const AdminSidebar = () => {
  const menuItems = [
    { label: 'Home', icon: <Home /> },
    { label: 'Service Records', icon: <Assignment /> },
    { label: 'Incidents', icon: <Build /> },
    { label: 'Workflows', icon: <Build /> },
    { label: 'Reports', icon: <Report /> },
  ];

  const [activeIndex, setActiveIndex] = useState<number>(1); // default active
  const { isMobile } = useWindowSize();
  const router = useRouter();

  return (
    <Stack
      direction="column"
      sx={{
        width: isMobile? 50 :  80,
        height: '100vh',
        bgcolor: '#1d2d50',
        color: 'white',
        alignItems: 'center',
        pt: 2,
        gap: 3,
        position: 'fixed',
        left: 0,
        top: 0,
      }}
    >
      {/* Logo */}
      <Box  mb={2}>
        <Image 
          src="/light_logo.png"
           width={60}
            height={60}
             alt="Logo"
             onClick={() => router.push('/')}
              />
      </Box>

      {/* Menu Items */}
      {menuItems.map((item, index) => (
        <Box
          key={item.label}
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Left pointer */}
          {activeIndex === index && (
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                width: 4,
                height: '100%',
                bgcolor: '#61dafb',
                borderRadius: '0 4px 4px 0',
              }}
            />
          )}

          <Tooltip title={item.label} placement="right">
            <IconButton
              onClick={() => setActiveIndex(index)}
              sx={{
                color: activeIndex === index ? '#61dafb' : 'white',
                borderRadius: 2,
                zIndex: 1,
              }}
            >
              {item.icon}
            </IconButton>
          </Tooltip>
        </Box>
      ))}

      {/* Spacer + Avatar */}
      <Box sx={{ flexGrow: 1 }} />
        <Person2Icon/>
        <Button sx={{mb:3}} >
          <FaPowerOff
           style={{ color: 'red', cursor: 'pointer', scale:1.5 }}
           onClick={() => {
             signOut()
           }}
          />
        </Button>
    </Stack>
  );
};

export default AdminSidebar;
