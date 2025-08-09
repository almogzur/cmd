'use client';
import { Box, Typography, Stack, Button } from '@mui/material';

;

export default function VerifyRequestPage() {
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
    <Typography fontSize={'1rem'} >
      אפשר לסגור את החלון 
    </Typography>
    </Stack>
  );
}
