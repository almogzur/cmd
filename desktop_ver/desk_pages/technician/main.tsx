import { useDesktopTechComponent } from "@/context/desktop_tech_selected_component"

import DesktopTechCalllsComponent from "@/desktop_ver/components/tech_call_component"

export default function DesktopTechnicianMainPage() {

    const { SelectedComponent, setSelectedComponent } =useDesktopTechComponent()
 
    return (
        <>
        {SelectedComponent ? SelectedComponent : <DesktopTechCalllsComponent/>}
        </>
    )
}