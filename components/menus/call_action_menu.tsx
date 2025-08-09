import { ButtonProps, MenuProps, Button, Menu, Stack, useTheme } from "@mui/material";
import TechAssignButton from "../buttons/assign_technician/tech_assign_button";
import CloseCallButton from "../buttons/close_call_btn";
import DeleteCallButton from "../buttons/delete_call_btn";
import EditCallButton from "../buttons/edit_call";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useThemeContext } from "@/context/theme_context";


type Props = {
  btnProps?: ButtonProps
  menuProps?: Omit<MenuProps, 'open' | 'anchorEl'>
  callId: string
  technicianId?: string
}


const CallActionMenu: React.FC<Props> = ({ btnProps, menuProps }) => {

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

  const {textColor,bgColor} =useThemeContext()

  return (
    <>

      <Button
        onClick={handleClick}

        {...btnProps}
      >
        <MoreVertIcon sx={{color:textColor}} />
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
        slotProps={{
          paper: {
            sx: {
              backgroundColor:bgColor,
            }
          }
        }}
      >
        <Stack
          spacing={1}
          p={1}
    
        >
          <TechAssignButton
            btnProps={{
              color: "success",
              sx: { width: 100, height: 20 },
              variant: 'contained'
            }}
            callId={""}
          />
          <EditCallButton
            btnProps={{ sx: { width: 100, height: 20 } }}
            callId={""}
          />

          <CloseCallButton
            btnProps={{ sx: { width: 100, height: 20 } }}
            callId={""}
          />
          <DeleteCallButton
            callId={""}
            btnProps={{ sx: { width: 100, height: 20 } }}
          />

        </Stack>


      </Menu>

    </>
  )
};
export default CallActionMenu