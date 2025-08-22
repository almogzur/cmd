import TechDesktopTabs from "@/components/menus/tech_tabs"
import ThemeSwitch from "@/components/theme_switch"
import { useThemeContext } from "@/context/theme_context"
import Stack from "@mui/material/Stack"
import Image from "next/image"
import Link from "next/link"


export default function DesktopTechnicianTopNavbar() {

    const { isDarkMode, toggleTheme , bgColor } = useThemeContext()
    return (
        <Stack
            direction="row"
            justifyContent={'space-between'}
            alignItems={'center'}
  
        >




            <TechDesktopTabs/>

            <ThemeSwitch 
                value={isDarkMode}
                 onChangeHandler={() => { toggleTheme() }}
             />


            <Link href={'/'} >
                <Image
                    src={ isDarkMode ?    "/light_logo.png" : "/dark_logo.png"}
                    width={60}
                    height={60}
                    alt="Logo"
                />
            </Link>

        </Stack>

    )
}