import { useThemeContext } from "@/context/theme_context"
import { useTechnicianServiceCalls } from "@/hooks/use_technician_service_calls"
import MobTechCallsAccordion from "@/mobile_ver/components/accordions/mob_tech_calls_accordion"
import { Typography } from "@mui/material"
import Stack from "@mui/material/Stack"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import MobilCallsOptionsMenu from "@/components/menus/calls_filter_options_menu"
import Settings from "@mui/icons-material/Settings"

const MobilTechnicianMainPage: React.FC = () => {

    const { data: session, status } = useSession()
    const { textColor, bgColor } = useThemeContext()

    const { serviceCalls, isLoading, isError } = useTechnicianServiceCalls(session?.user.id)

    useEffect(() => {
        console.log(serviceCalls)
    }, [serviceCalls]);

    if (isLoading || !serviceCalls) return <div>Loading...</div>

    return (
        <>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={1}
                px={1}
                position={'sticky'}
                top={50}
                zIndex={1000}
                bgcolor={bgColor}

            >

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

            <MobTechCallsAccordion calls={serviceCalls} />

        </>
    )
}

export default MobilTechnicianMainPage  