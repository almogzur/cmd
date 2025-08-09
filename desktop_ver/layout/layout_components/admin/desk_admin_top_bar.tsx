import TabsComponent from "@/components/tabs"
import Stack from "@mui/material/Stack"
import Image from "next/image"
import Link from "next/link"
import ThemeSwitch from "@/components/theme_switch"
import { useThemeContext } from "@/context/theme_context"



export default function AdminDeskTopNavbar() {

    const { isDarkMode, toggleTheme } = useThemeContext()

    return (
        <Stack
            direction="row"
            justifyContent={'space-between'}
            alignItems={'center'}
        >
            <TabsComponent />

            <ThemeSwitch
                label={''}
                value={isDarkMode}
                onChangeHandler={() => { toggleTheme() }}
                SwitchProps={{ color: 'info' }}
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