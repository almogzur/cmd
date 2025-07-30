'use client';

import { useSession } from 'next-auth/react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Stack,
  Divider,
  Button,
} from '@mui/material';
import { useState } from 'react';
import UserLayout from '@/layouts/user_layout';
import AdminLayout from '@/layouts/admin_layout';
import InputWrap from '@/components/mui-wrappers/input-wrap';
import { useWindowSize } from '@/context/window_size';

const ProfilePage = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const { isMobile, isTablet } = useWindowSize();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
  });

  const Layout = user?.role === 'ADMIN' ? AdminLayout : UserLayout;

  if (!user) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ direction: 'rtl' }}
      >
        <Typography variant="h6">טוען פרופיל...</Typography>
      </Box>
    );
  }

  const handleSave = async () => {
    try {
      const res = await fetch('/api/user/update_info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to update');
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          background: '#fdfaf6',
          minHeight: '100vh',
          py: 5,
          px: 2,
          direction: 'rtl',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: isMobile ? 300 : isTablet ? 400 : 600,
            mx : 'auto',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              borderRadius: 4,
              p: isMobile ? 3 : 4,
              width: '100%',
              textAlign: 'right',
            }}
          >
            <Stack
              direction={isMobile ? 'column' : 'row'}
              spacing={2}
              alignItems={isMobile ? 'flex-start' : 'center'}
              gap={2}
            >
              <Avatar
                src={user.image || undefined}
                sx={{ width: 64, height: 64 }}
              />
              <Box>
                <Typography variant="h5" fontWeight={600}>
                  {formData.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle1" gutterBottom>
              פרטי משתמש
            </Typography>

            <Stack spacing={2}>
              <InputWrap
                label="שם"
                value={formData.name}
                onChangeHandler={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                fullWidth
                disabled={!editMode}
                variant="standard"
              />
              <InputWrap
                label="טלפון"
                value={formData.phone}
                onChangeHandler={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                fullWidth
                disabled={!editMode}
                variant="standard"
              />
            </Stack>

            <Box
              mt={3}
              display="flex"
              flexDirection={isMobile ? 'column' : 'row'}
              gap={2}
              justifyContent="space-between"
            >
              {editMode ? (
                <>
                  <Button
                    onClick={handleSave}
                    variant="contained"
                    fullWidth={isMobile}
                  >
                    שמור
                  </Button>
                  <Button
                    onClick={() => setEditMode(false)}
                    fullWidth={isMobile}
                  >
                    ביטול
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setEditMode(true)}
                  variant="outlined"
                  fullWidth={isMobile}
                >
                  ערוך פרטים
                </Button>
              )}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Layout>
  );
};

export default ProfilePage;
