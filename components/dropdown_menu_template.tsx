import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button, { } from '@mui/material/Button';





export default function DropMenu() {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);



  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = (e: React.MouseEvent<HTMLElement>) => {

    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>

      <Button
        onClick={handleClick}

       
      >

      </Button>


      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >


      </Menu>

    </>
  );
}
