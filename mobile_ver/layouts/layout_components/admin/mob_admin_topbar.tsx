'use client';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import SupervisorAccountTwoToneIcon from '@mui/icons-material/SupervisorAccountTwoTone';
import Person2Icon from '@mui/icons-material/Person2';

import Home from '@mui/icons-material/Home';
import ReceiptLong from '@mui/icons-material/ReceiptLong';

import { signOut } from 'next-auth/react';

import ThemeSwitch from '@/components/theme_switch'
import dynamic from 'next/dynamic';

import MenuIcon from '@mui/icons-material/Menu';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useThemeContext } from '@/context/theme_context';
import AdminSelectPageMenu, { MenuItem } from '@/mobile_ver/components/menus/mob_admin_select_page_menu';


const ProfilePage = dynamic(() => import('@/mobile_ver/mob_pages/admin/profile'));
const TechnicianPage = dynamic(() => import('@/mobile_ver/mob_pages/admin/technician'));
const ServiceRecordsPage = dynamic(() => import('@/mobile_ver/mob_pages/admin/service_records'));
const CallsTable = dynamic(() => import('@/mobile_ver/mob_pages/admin/call_table'));

const menuItems: MenuItem[] = [
  { label: 'Main', Icon: <Home />, Component: CallsTable },
  { label: 'ServiceRecords', Icon: <ReceiptLong />, Component: ServiceRecordsPage },
  { label: 'Technician', Icon: <SupervisorAccountTwoToneIcon />, Component: TechnicianPage },
  { label: 'profile', Icon: <Person2Icon />, Component: ProfilePage },
];

const MobilAdminTopBar = () => {


  const { isDarkMode, toggleTheme, textColor, bgColor } = useThemeContext()


  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ p: 1,
        position:'sticky',
        top: 0,
       
        zIndex: 1000,
        backgroundColor: bgColor,
        borderBottom: '1px solid #e0e0e0',
        
       }}
    >

      < AdminSelectPageMenu
        items={menuItems}
        Icon={<MenuIcon sx={{ color: textColor, scale: 1.5 }} />
      }
      />

      <ThemeSwitch
        value={isDarkMode}
        onChangeHandler={() => { toggleTheme() }}
        switchProps={{ color: 'info' }}
        stackProps={{justifyContent:'end', width:"100%" }}

      />

      {/* logout button */}


        <PowerSettingsNewIcon
          style={{ color: 'red', cursor: 'pointer', scale: 1.1 , marginRight:10, marginLeft:10 }}
          onClick={() => signOut()}
        />
    

    </Stack>
  );
};

export default MobilAdminTopBar;
