'use client';

import { useState } from 'react';

import InputWrap from '@/components/inputs/input-wrap';
import AutoHideSnackbar from '@/components/snackbar';
import Button from '@mui/material/Button';
import  Typography from '@mui/material/Typography'
import  Stack from '@mui/material/Stack'
import  Box from '@mui/material/Box'
import  Paper from '@mui/material/Paper'

export default function CreateTechnicianForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: 'TECHNICIAN' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/user/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          role: 'TECHNICIAN',
        }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        setError(error || 'אירעה שגיאה ביצירת המשתמש');
        return;
      }
      setSucceeded(true); 

      setFormData({ name: '', email: '', phone: '' , role: 'TECHNICIAN' });
    } catch (err) {
      console.error('Technician signup error:', err);
      setError('אירעה שגיאה');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 300,
          width: '100%',
          p: 2,
          borderRadius: 2,
          mx: 'auto',
          my: 5,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6" textAlign="center">
            צור טכנאי חדש
          </Typography>


            <>
              <InputWrap
                fullWidth
                label="שם"
                name="name"
                value={formData.name}
                onChangeHandler={handleChange}
              />
              <InputWrap
                fullWidth
                label="אימייל"
                name="email"
                value={formData.email}
                onChangeHandler={handleChange}
              />
              <InputWrap
                fullWidth
                label="טלפון"
                name="phone"
                value={formData.phone}
                onChangeHandler={handleChange}
              />

              {error && (
                <Typography color="error" textAlign="center">
                  {error}
                </Typography>
              )}

              {succeeded && (
                <AutoHideSnackbar 
                message='הטכנאי נוצר בהצלחה'
                />
              )}

              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'שולח...' : 'צור טכנאי'}
              </Button>
            </>

        </Stack>
      </Paper>
    </Box>
  );
}
