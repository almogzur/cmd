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
import AdminSelectPageMenu, { MenuItem } from '@/mobile_ver/mob_components/menus/mob_admin_select_page_menu';


const ProfilePage = dynamic(() => import('@/mobile_ver/mob_pages_markup/admin/profile'));
const TechnicianPage = dynamic(() => import('@/mobile_ver/mob_pages_markup/admin/technician'));
const ServiceRecordsPage = dynamic(() => import('@/mobile_ver/mob_pages_markup/admin/service_records'));
const CallsTable = dynamic(() => import('@/mobile_ver/mob_pages_markup/admin/call_table'));

const menuItems: MenuItem[] = [
  { label: 'Main', Icon: <Home />, Component: CallsTable },
  { label: 'ServiceRecords', Icon: <ReceiptLong />, Component: ServiceRecordsPage },
  { label: 'Technician', Icon: <SupervisorAccountTwoToneIcon />, Component: TechnicianPage },
  { label: 'profile', Icon: <Person2Icon />, Component: ProfilePage },
];

const MobilAdminTopBar = () => {


  const { isDarkMode, toggleTheme, textColor } = useThemeContext()


  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ p: 1 }}
    >

      < AdminSelectPageMenu
        items={menuItems}
        Icon={<MenuIcon sx={{ color: textColor, scale: 1.5 }} />}
      />

      <ThemeSwitch
        label={''}
        value={isDarkMode}
        onChangeHandler={() => { toggleTheme() }}
        SwitchProps={{ color: 'info' }}

      />

      {/* logout button */}
      <Button sx={{ mr: 'auto' }} >

        <PowerSettingsNewIcon
          style={{ color: 'red', cursor: 'pointer', scale: 1.2 }}
          onClick={() => signOut()}
        />
      </Button>

    </Stack>
  );
};

export default MobilAdminTopBar;
