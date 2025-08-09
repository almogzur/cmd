import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { translateLabelToHebrew } from '@/lib/heb'
import { useMobileAdminComponent } from '@/context/mobile_admin_selected_component_provider';
import { useThemeContext } from '@/context/theme_context';


export type MenuItem = {
  label: string;
  Icon: React.ReactNode;
  Component: React.ComponentType
};

export type DropMenuProps = {
  btnText?: string;
  items?: MenuItem[];
  Icon?: React.ReactNode;
}

const AdminSelectPageMenu : React.FC<DropMenuProps> = ({ btnText, items, Icon }) => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { setSelectedComponent } = useMobileAdminComponent()
  
  const {textColor ,bgColor} = useThemeContext()

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = (e: React.MouseEvent<HTMLElement>, item: MenuItem) => {
    setSelectedComponent(<item.Component />)
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {Icon ?
        <IconButton 
          onClick={handleClick}
          
          >
          {Icon}
        </IconButton>
        :
        <Button
          color='error'
          variant='outlined' onClick={handleClick}>
          {btnText}
        </Button>
      }


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
  
        slotProps={{
          paper:{
            sx: {
              backgroundColor: bgColor,
              color: textColor
            }
          }
        }}
        
      >
        {items?.map((item) => (
          <MenuItem
            key={item.label}
            onClick={(e) => handleSelect(e, item)}
            sx={{ gap: 2 }}
          >
            {item.Icon}
            {translateLabelToHebrew(item.label)}
          </MenuItem>

        ))
        }

      </Menu>

    </>
  );
}


export default AdminSelectPageMenu