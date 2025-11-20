import ThemeSwitch from "@/components/theme_switch";
import { useThemeContext } from "@/context/theme_context";
import Stack from "@mui/material/Stack";

export default function DeskUserTopBar() {
    const { bgColor, textColor, toggleTheme , isDarkMode} = useThemeContext()

    return (
        <Stack
         direction="row"
          spacing={2}
          height={60}
            bgcolor={bgColor}
         justifyContent={'space-between'}
         alignItems={'center'}
         >


        <ThemeSwitch 
            value={isDarkMode}
             onChangeHandler={toggleTheme}
            
             />
             
        </Stack>
    )
}