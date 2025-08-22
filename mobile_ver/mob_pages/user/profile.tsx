import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Avatar from "@mui/material/Avatar"
import CachedIcon from '@mui/icons-material/Cached';

import InputWrap from "@/components/inputs/input-wrap"
import { useSession } from "next-auth/react";
import { useState } from "react"
import Button from "@mui/material/Button"


const MoblieProfilePage = () => {
  const { data: session , update } = useSession()
  const user = session?.user;

if(!user) return <div>Loading...</div>

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

    return (
      <Stack
      direction={'row'}
      justifyContent={"center"}
      width={'100%'}

        sx={{

          mt: 5,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            borderRadius: 4,
            p: 3,
            width: '100%',
            textAlign: 'right',
            position: 'relative',
          maxWidth:  240 
          }}>
          <CachedIcon sx={{ position: 'absolute', top: 10, left: 10 }} onClick={() => update()} />
          <Stack
             direction={'column' } 
              spacing={2}
               alignItems={ 'flex-start'}>
            <Avatar src={user.image || undefined} sx={{ width: 64, height: 64 }} />

            <Box>
              <Typography variant="h5" fontWeight={600}>{formData.name}</Typography>
              <Typography variant="body2" color="text.secondary">{user.email}</Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle1" gutterBottom>פרטי אדמין</Typography>

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

          <Box mt={3} display="flex" flexDirection={ 'column' } gap={2} justifyContent="space-between">
            {editMode ? (
              <>
                <Button onClick={handleSave} variant="contained" fullWidth>שמור</Button>
                <Button onClick={() => setEditMode(false)} fullWidth>ביטול</Button>
              </>
            ) : (
              <Button onClick={() => setEditMode(true)} variant="outlined" fullWidth >ערוך פרטים</Button>
            )}
          </Box>
        </Paper>

      </Stack>
    )
}

export default MoblieProfilePage