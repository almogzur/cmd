import * as React from 'react';
import Menu, { MenuProps } from '@mui/material/Menu';
import Button, { ButtonProps } from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteCallButton from '@/components/buttons/delete_call_btn';
import CloseCallButton from '@/components/buttons/close_call_btn';
import TechAssingButton from '@/components/buttons/assign_technician/tech_assign_button';
import { Stack } from '@mui/material';

type Props = {
  btnProps ?: ButtonProps
  menuProps ?: Omit<MenuProps , 'open'| 'anchorEl'>
}

export default function MobileCallsActionsButtons({btnProps, menuProps}: Props) {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const items = [TechAssingButton,  CloseCallButton,DeleteCallButton ]


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
        <MoreVertIcon />
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
        {...menuProps}
      >
        <Stack 
          spacing={1}
          p={1}
         
         >
        {
        items.map((Item, index) => {
          return  <Item key={index} callId={''} 
          />
          
        })
      }
      </Stack>


      </Menu>

    </>
  );
}
