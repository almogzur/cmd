
import { useMobileAdminComponent } from "@/context/mobile_admin_selected_component"
import MobileCallTablePage from "./call_table"

export default function MobileAdminMainPage() {

    const { SelectedComponent }  = useMobileAdminComponent()


    return (
        <>
    {SelectedComponent ? SelectedComponent : <MobileCallTablePage/>}
    </>
    )
}



