import { useWindowSize } from "@/context/window_size";
import DesktopTechnicianMainPage from "@/desktop_ver/desk_pages_markup/technician/main";
import DesktopTechniciansLayout from "@/desktop_ver/layout/desk_technicians_layout";
import MobilTechniciansLayout from "@/mobile_ver/layouts/mob_technicians_layout";
import MobilTechnicianMainPage from "@/mobile_ver/mob_pages_markup/technicians/main";


export default function TechniciansMainPage() {

    const { isMobile } = useWindowSize();

    const Layout =  isMobile ? MobilTechniciansLayout : DesktopTechniciansLayout
    
    const Page =  isMobile ?   MobilTechnicianMainPage : DesktopTechnicianMainPage

    return (
     <Layout>
        <Page/>
    </Layout>

    )
}