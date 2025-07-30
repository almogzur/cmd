'use client';
import { useWindowSize } from '@/context/window_size';
import { Box, Typography, Stack, Button } from '@mui/material';

;

export default function VerifyRequestPage() {
  const { isMobile} = useWindowSize();
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
      sx={{ height: '100vh', textAlign: 'center', direction: 'rtl', backgroundColor: '#f5f5f5' }}
    >
      <Typography variant="h4" component="h1">
        בדוק את תיבת הדואר שלך
      </Typography>
      <Typography variant="body1" color="text.secondary">
        קישור הכניסה נשלח לכתובת המייל שלך. לחץ עליו כדי להתחבר.
      </Typography>
    <Typography variant={isMobile ? 'h5' : 'h4'} >
      אפשר לסגור את החלון 
    </Typography>
    </Stack>
  );
}
