
import { useMobileAdminComponent } from "@/context/mobile_admin_selected_component_provider"
import MobileCallTablePage from "./call_table"

export default function MobileAdminMainPage() {

    const { SelectedComponent }  = useMobileAdminComponent()


    return (
        <div>
            {SelectedComponent ? SelectedComponent : <MobileCallTablePage/>}
        </div>
    )
}



const FloatingContainer = () => {
    return (
        <div>
            <h1>Floating container</h1>
        </div>
    )
}