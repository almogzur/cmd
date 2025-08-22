import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button, { ButtonProps } from '@mui/material/Button';
import { User } from '@prisma/client';
import { useAdminTechnicians } from '@/hooks/use_admin_technicians_list';

export type MenuItem = Omit<User, 'createdAt' | 'updatedAt' | 'image' | 'emailVerified'>

export type DropMenuProps = {
  btnProps?: ButtonProps;
  btnText?: string
  callId: string
  parentState?: { // closes the parent menu 
    value: boolean
    setValue: React.Dispatch<React.SetStateAction<HTMLElement | null>>
  }
  

}

export default function TechniciansDropMenu({ btnProps, btnText, callId, parentState }: DropMenuProps) {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { technicians, isLoading } = useAdminTechnicians()

  const open = Boolean(anchorEl);

  const updateServiceCall = async (technicianId: string, callId: string) => {

    try {
      const res = fetch('/api/service_calls/assign_call_technician', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          callId,
          technicianId
        }),
      })
      return res
    }
    catch (err) {
      alert(err)
    }

  }

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = async (e: React.MouseEvent<HTMLElement>, item: MenuItem, callId: string) => {

    await updateServiceCall(item.id, callId)

    parentState?.setValue(null)

  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>

      <Button
        onClick={openMenu}
        variant='contained'
        color="success"
        loading={isLoading}

        {...btnProps}
      >

        {btnText}
      </Button>


      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {technicians?.map((technician) => (
          <MenuItem
            key={technician.id}
            onClick={(e) => handleSelect(e, technician, callId)}
            sx={{ gap: 2 }}
          >

            {technician.name}
          </MenuItem>

        ))
        }

      </Menu>

    </>
  );
}
