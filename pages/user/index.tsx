
// Layouts 

import DesktopUserLayout from "@/desktop_ver/layout/desk_user_layout";
import MobileUserLayout from "@/mobile_ver/layouts/mob_user_layout";

// Page markup

import MobileUserMainPage from "@/mobile_ver/mob_pages/user/main"
import DesktopUserMainPage from "@/desktop_ver/desk_pages/user/main"


import { useWindowSize } from "@/context/window_size";

export default function UserMainPage() {

    const { isMobile } = useWindowSize()

    const Layout = isMobile ? MobileUserLayout : DesktopUserLayout 
    const Page = isMobile ? MobileUserMainPage : DesktopUserMainPage


    return( 
        <Layout>
            <Page />
        </Layout>
    )
}