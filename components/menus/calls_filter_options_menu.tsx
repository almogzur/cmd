import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Menu, { MenuProps } from '@mui/material/Menu';
import Button, { ButtonProps } from '@mui/material/Button';
import { useThemeContext } from '@/context/theme_context';




type NestedListProps = {
    Icon: React.ReactNode,
    btnProps?: ButtonProps
    menuProps?: MenuProps
}

const CallsFilterOptionsMenu: React.FC<NestedListProps> = ({
    btnProps,
    Icon,
    menuProps
}) => {


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { bgColor, textColor } = useThemeContext()

    const [mode, setMode] = React.useState(false);
    const [owner, setOwner] = React.useState(false);

    const menuOpen = Boolean(anchorEl);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleClickMode = () => {
        setMode(!mode);
    };
    const handleClickOwner = () => {
        setOwner(!owner);
    };
    const handleSelect = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                onClick={handleOpenMenu}
                size='small'
                sx={{ textAlign: 'center', borderRadius: 3 }}

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
                    paper: {
                        sx: { bgcolor: bgColor, color: textColor }

                    }
                }}
                sx={{
                    '& .MuiTypography-root': {
                        color: 'inherit'
                    }
                }}
                {...menuProps}
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
                        sx={{ gap: 2 }}
                        onClick={handleClickMode}
                    >

                        <InboxIcon />

                        <ListItemText primary="סדר לפי מצב קריאה" />
                        {mode
                            ? <ExpandLess />
                            : <ExpandMore />
                        }
                    </ListItemButton>

                    <Collapse
                        unmountOnExit
                        in={mode}
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
                    
                    <ListItemButton
                        sx={{ gap: 2 }}
                        onClick={handleClickOwner}
                    >

                        <InboxIcon />

                        <ListItemText primary="הצג קריאות של" />
                        {owner
                            ? <ExpandLess />
                            : <ExpandMore />
                        }
                    </ListItemButton>

                    <Collapse
                        unmountOnExit
                        in={owner}
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