 import { useThemeContext } from '@/context/theme_context';
import DeskUserTopBar from '@/desktop_ver/layout/layout_components/user/desk_user_top_bar'
import Box from '@mui/material/Box';


const DesktopUserLayout = ({ children }: {  children?: React.ReactNode }) => {
    const { bgColor, textColor } = useThemeContext()
    return (
    <Box sx={{  minHeight: '100vh' , bgcolor:bgColor }} >
    <DeskUserTopBar/>
    {children}

    </Box>
    );
};
export default DesktopUserLayout;