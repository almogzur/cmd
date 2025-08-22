import { ButtonProps, MenuProps, Button, Menu, Stack } from "@mui/material";
import CloseCallButton from "../buttons/close_call_btn";
import DeleteCallButton from "../buttons/delete_call_btn";
import EditCallButton from "../buttons/admin_edit_call";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useThemeContext } from "@/context/theme_context";
import TechniciansDropMenu from "../buttons/assign_technician/tech_dropdown_menu";
import { useSession } from "next-auth/react";
import { ServiceCallStatus } from "@prisma/client";
import ReopenCallButton from "../buttons/re_open_call_btn";


type Props = {
  btnProps?: ButtonProps
  menuProps?: Omit<MenuProps, 'open' | 'anchorEl'>
  callId: string
  callStatus: ServiceCallStatus

}


const AdminCallActionMenu: React.FC<Props> = ({
  btnProps,
  menuProps,
  callId,
  callStatus
}) => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const { data: session } = useSession()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { textColor, bgColor } = useThemeContext()

  if (!session) return null

  return (
    <>

      <Button
        onClick={handleClick}
        {...btnProps}
      >
        <MoreVertIcon sx={{ color: textColor }} />
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
              backgroundColor: bgColor,
            }
          }
        }}
      >
        <Stack
          spacing={1}
          p={1}

        >
          {callStatus !== 'DONE' &&
            <>
              <TechniciansDropMenu
                btnProps={{ sx: { width: 100, height: 20 } }}
                callId={callId}
                btnText="שייך"
                parentState={{
                  value: open,
                  setValue: setAnchorEl
                }}
              />

              <EditCallButton
                btnProps={{ sx: { width: 100, height: 20 } }}
                callId={callId}
                parentState={{
                  value: open,
                  setValue: setAnchorEl
                }}
                technicianId={session?.user.id}

              />


              <CloseCallButton
                btnProps={{
                  sx: { width: 100, height: 20 },

                }}
                callId={callId}
                parentState={{
                  value: open,
                  setValue: setAnchorEl
                }}
              />
            </>
          }

          {callStatus === 'DONE' &&
            <ReopenCallButton
              btnProps={{ sx: { width: 100, height: 20 } }}
              callId={callId}
              parentState={{
                  value: open,
                  setValue: setAnchorEl
                }}

            />
          }




           <DeleteCallButton
            callId={callId}
            btnProps={{ sx: { width: 100, height: 20 } }}
            parentState={{
              value: open,
              setValue: setAnchorEl
            }}
          /> 



        </Stack>


      </Menu>

    </>
  )
};
export default AdminCallActionMenu