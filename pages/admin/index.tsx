
import DesktopAdminLayout from "@/desktop_ver/layout/desk_admin_layout"
import MobilAdminLayout from "@/mobile_ver/layouts/mob_admin_layout"

import MobileAdminMainPage from "@/mobile_ver/mob_pages_markup/admin/main"
import DesktopAdminMainPage from "@/desktop_ver/desk_pages_markup/admin/main"

import { useWindowSize } from "@/context/window_size";


export default function AdminMainPage() {

    const { isMobile } = useWindowSize();

    const Layout =  isMobile ? MobilAdminLayout : DesktopAdminLayout
    const Page =  isMobile ?   MobileAdminMainPage : DesktopAdminMainPage

    return (
     <Layout>
        <Page/>
    </Layout>

    )
}