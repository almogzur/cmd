
import UserTopNavbar from "@/mobile_ver/layouts/layout_components/user/mob_user_top_bar";
import UserFooter from "@/mobile_ver/layouts/layout_components/user/mob_user_footer";
import  Box  from "@mui/material/Box";
import { useThemeContext } from "@/context/theme_context";

export default function MobileUserLayout({ children}: { children?: React.ReactNode }) {

    const { bgColor }= useThemeContext()
    return (
        <Box  sx={{  minHeight: '100vh' , bgcolor: bgColor}} >
                <UserTopNavbar />
                {children}
                <UserFooter />
        </Box>
    )
}