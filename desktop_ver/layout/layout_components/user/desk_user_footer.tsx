import { useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function DeskUserFooter() {
    const theme = useTheme();
    return (
       <Stack
       height={60}
        sx={{   position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: theme.palette.primary.main,
        borderTop: '1px solid #e0e0e0',

        direction: 'rtl',}}
         >
        </Stack>
    )
}