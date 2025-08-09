import * as React from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

export default function AutoHideSnackbar({message}:{message:string}) {
    
  const [open, setOpen] = React.useState(true);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>

      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={message}
      />
    </div>
  );
}
