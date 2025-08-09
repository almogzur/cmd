import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button, { ButtonProps } from '@mui/material/Button';

export type MenuItem = {
  label: string;

};

export type DropMenuProps = {
  items?: MenuItem[];
  btnProps?: ButtonProps;
  btnText?: string 
  technicianId?: number
}

export default function TechniciansDropMenu({ items, btnProps, btnText }: DropMenuProps) {

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
       {...btnProps}
       
      >
      {btnText}
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
        {items?.map((item) => (
          <MenuItem
            key={item.label}
            onClick={(e) => handleSelect(e)}
            sx={{ gap: 2 }}
          >

            {item.label}
          </MenuItem>

        ))
        }

      </Menu>

    </>
  );
}
