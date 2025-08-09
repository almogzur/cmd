import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Menu, { MenuProps } from '@mui/material/Menu';
 import Button, { ButtonProps } from '@mui/material/Button';
import { useThemeContext } from '@/context/theme_context';
import { Typography } from '@mui/material';



type ListItem = {
    label: string;
    icon: React.ReactNode;
}

type NestedListProps = {
    Icon: React.ReactNode,
    items?: ListItem[];
    title?: string
    btnProps?: ButtonProps
    menuProps?: MenuProps

}

const CallsFilterOptionsMenu : React.FC<NestedListProps> = ({
    items,
    btnProps,
    Icon
}) => {


    const [open, setOpen] = React.useState(true);
    
    // const [collapse , setCollapse] = React.useState({
    //     orderBy: false,
    //     view: false
    // });


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const {bgColor,textColor} = useThemeContext()

    const menuOpen = Boolean(anchorEl);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleClick = () => {
        setOpen(!open);
    };
    const handleSelect = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                onClick={handleOpenMenu}
                size='small'
                sx={{  textAlign:'center', borderRadius: 3 }}
                {...btnProps}
               
            >
                {Icon}
            </Button>


            <Menu
                open={menuOpen}
                anchorEl={anchorEl}

                onClose={handleMenuClose}
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
                        sx:{ bgcolor:bgColor , color:textColor}

                    }
                }}
                sx={{
                    '& .MuiTypography-root': {
                        color: 'inherit'
                    }
                }}

            >
                <List
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                
                    }}
                    component="menu"
                    aria-labelledby="nested-list-subheader"
                >
                    <ListItemButton
                        onClick={handleSelect}
                        sx={{ gap: 2, width: '100%', textAlign: 'right' }}

                    >
                        <SendIcon />
                        <Typography sx={{color:'inherit'}} >אחד שתיים</Typography>

                    </ListItemButton>

                    <ListItemButton
                        sx={{ gap: 2, width: '100%', textAlign: 'right' }}
                    >

                        <DraftsIcon />
                        
                        <Typography>Drafts</Typography>

                    </ListItemButton>


                    <ListItemButton
                        sx={{ gap: 2 }}
                        onClick={handleClick}
                    >

                        <InboxIcon />

                        <ListItemText primary="סדר לפי" />
                        {open
                            ? <ExpandLess />
                            : <ExpandMore />
                        }
                    </ListItemButton>

                    <Collapse
                        unmountOnExit
                        in={open}
                        sx={{ width: '100%' }}

                    >
                        <List
                            component="div"
                            disablePadding
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'start',
                            }}

                        >
                            <ListItemButton
                                sx={{ gap: 2, width: '100%', textAlign: 'right' }}

                            >
                                <StarBorder />
                                <ListItemText primary="חדש" />



                            </ListItemButton>

                            <ListItemButton
                                sx={{ gap: 2, width: '100%', textAlign: 'right' }}
                            >

                                <StarBorder />

                                <ListItemText primary="משוייך" />


                            </ListItemButton>
                        </List>

                    </Collapse>


                </List>

            </Menu>
        </>


    );
}


export default CallsFilterOptionsMenu