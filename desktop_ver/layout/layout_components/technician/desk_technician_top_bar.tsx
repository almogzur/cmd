import TabsWrapper from "@/components/tabs"
import Stack from "@mui/material/Stack"
import Image from "next/image"
import Link from "next/link"


export default function DesktopTechnicianTopNavbar() {

    return (
        <Stack
            direction="row"
            bgcolor={'#1d2d50'}
            justifyContent={'space-between'}
            alignItems={'center'}
        >
        <TabsWrapper />

            <Link href={'/'} >
                <Image
                    src="/light_logo.png"
                    width={60}
                    height={60}
                    alt="Logo"
                />
            </Link>

        </Stack>

    )
}