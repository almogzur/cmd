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

import CachedIcon from '@mui/icons-material/Cached';
import { useRouter } from 'next/router';
import InputWrap from '@/components/inputs/input-wrap';


const UserProfilePage = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const user = session?.user;


  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });

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
    } finally {
      update();
    }
  };

  if (!user) return null;
  if (user.role !== 'USER') {
    router.push('/profile/admin');
    return null;
  }

  return (

      <Stack          >

        <Box sx={{ 
          width:  240 ,
          mx: 'auto',
          my:3
        }
          }>
          <Paper 
            elevation={3}
             sx={{ 
              borderRadius: 4,
                p: 3,
                textAlign: 'right', position: 'relative' 
                }}
             >
            <CachedIcon sx={{ position: 'absolute', top: 10, left: 10 }} onClick={() => update()} />
            <Stack spacing={2} alignItems={  'flex-start'}>
              <Avatar src={user.image || undefined} sx={{ width: 64, height: 64 }} />
              <Box>
                <Typography variant="h5" fontWeight={600}>{formData.name}</Typography>
                <Typography variant="body2" color="text.secondary">{user.email}</Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle1" gutterBottom>פרטי משתמש</Typography>

            <Stack spacing={2}>
              <InputWrap
                label="שם"
                value={formData.name}
                onChangeHandler={(e) => setFormData({ ...formData, name: e.target.value })}
                fullWidth
                disabled={!editMode}
                variant="standard"
              />
              <InputWrap
                label="טלפון"
                value={formData.phone}
                onChangeHandler={(e) => setFormData({ ...formData, phone: e.target.value })}
                fullWidth
                disabled={!editMode}
                variant="standard"
              />
            </Stack>

            <Box mt={3} display="flex" flexDirection={'row'} gap={2} justifyContent="space-between">
              {editMode ? (
                <>
                  <Button onClick={handleSave} variant="contained">שמור</Button>
                  <Button onClick={() => setEditMode(false)} >ביטול</Button>
                </>
              ) : (
                <Button onClick={() => setEditMode(true)} variant="outlined">ערוך פרטים</Button>
              )}
            </Box>
          </Paper>
        </Box>
      </Stack>

  );
};

export default UserProfilePage;
