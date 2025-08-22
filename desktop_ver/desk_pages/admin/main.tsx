
import { useDesktopAdminComponent } from "@/context/desktop_admin_selected_component";
import DesktopCallsComponent from "@/desktop_ver/components/admin_calls_component";

const  DesktopAdminMainPage : React.FC =  ()=> {


  const {SelectedComponent} = useDesktopAdminComponent()


  return (
    <>
        {SelectedComponent ? SelectedComponent : <DesktopCallsComponent/>}
    </>


  )
}

export default DesktopAdminMainPage
