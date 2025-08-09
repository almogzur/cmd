import MobilAdminAccordion from "@/mobile_ver/mob_components/accordions/mob_admin_calls_accordion"
import MobilCallsOptionsMenu from "@/components/menus/calls_filter_options_menu"
import { useAdminServiceCalls } from "@/hooks/use_admin_service_calls"
import { Settings } from "@mui/icons-material"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useThemeContext } from "@/context/theme_context"


export default function CallTablePage() {

    const { serviceCalls, isError, isLoading } = useAdminServiceCalls()
    const { textColor,} = useThemeContext()


    if (isLoading || isError || !serviceCalls) return <div>Loading...</div>

    return (
        <div>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1} px={1}>

                <Typography
                    variant="h6"
                    fontWeight={600}
                    color={textColor}
                >
                    קריאות שירות
                </Typography>

                <MobilCallsOptionsMenu
                    Icon={<Settings sx={{ scale: 1.1, color: textColor }} />}
                />
            </Stack>

            <MobilAdminAccordion
                title=""
                items={serviceCalls}
            />
        </div>
    )
}