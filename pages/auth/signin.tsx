'use client'

import React from 'react';
import {
  Box,
  Button,
  CssBaseline,
  Typography,
  Stack,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import Logo from '@/public/dark_logo.png';
import InputWrap from '@/components/mui-wrappers/input-wrap';
import { signIn } from "next-auth/react";

const CenteredPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 400,
  backgroundColor: '#f4f6f8',
  borderRadius: 16,
  direction: 'rtl',
}));

const SignIn = () => {
  const [user, setUser] = React.useState({
    email: '',
    role: 'USER',
  });

  const handleSignIn = () => {
    signIn("email", {
      email: user.email,
      callbackUrl: user.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard',
    });
  };

  return (
    <>
      <CssBaseline />
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="#e9ebee"
        px={2}
      >
        <CenteredPaper elevation={6}>
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Image
              src={Logo}
              alt="לוגו Check My Desk"
              width={80}
              height={80}
              style={{ filter: 'drop-shadow(0 0 4px #007aff)' }}
            />

            <Typography variant="h5" fontWeight="bold">
              התחברות ל־Check My Desk
            </Typography>

            <InputWrap
              label="מייל"
              value={user.email}
              onChangeHandler={(e) =>
                setUser({ ...user, email: e.target.value })
              }
              helpText={undefined}
              variant="outlined"
              fullWidth
              isLabelBold
              type="email"
              required
            />

            <FormControl fullWidth>
              <InputLabel id="role-label">בחר תפקיד</InputLabel>
              <Select
                labelId="role-label"
                value={user.role}
                label="בחר תפקיד"
                onChange={(e) =>
                  setUser({ ...user, role: e.target.value })
                }
              >
                <MenuItem value="USER">משתמש </MenuItem>
                <MenuItem value="ADMIN">מנהל</MenuItem>
              </Select>
            </FormControl>

            <Button
              sx={{ mt: 2 }}
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSignIn}
            >
              התחבר
            </Button>
          </Stack>
        </CenteredPaper>
      </Box>
    </>
  );
};

export default SignIn;
