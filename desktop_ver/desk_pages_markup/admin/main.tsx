import CallsTable from "@/desktop_ver/desk_components/data_grid/data_grid_wrapper"
import AdminColumns from "@/desktop_ver/desk_components/data_grid/data_grid_props/admin/admin_cols";
import { useAdminServiceCalls } from "@/hooks/use_admin_service_calls";
import { useAdminDataGridOptions } from "@/context/admin_data_grid_options";
import { useThemeContext } from "@/context/theme_context";
import Typography from "@mui/material/Typography";
import MobilCallsFilterOptionsMenu from "@/components/menus/calls_filter_options_menu";
import { Settings } from "@mui/icons-material";

export default function DesktopAdminMainPage() {

    const { serviceCalls, isError, isLoading } = useAdminServiceCalls()
    const { options } = useAdminDataGridOptions()
    const { textColor } = useThemeContext()
        

    if(isLoading || !serviceCalls) return <div>Loading...</div>

    if(isError) return <div>Error</div>

    
    
    return (
        <>
      <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' , color: textColor }}>
        קריאות שירות
      </Typography>

 
         <CallsTable
            serviceCalls={serviceCalls}
                columnsProps={AdminColumns()}
                tableProps={{
                    ...options,
                    disableAutosize: true,
                    sx: {
                        "& .MuiDataGrid-cell": {  
                            color: textColor,
                        },
                        m:2
                    }
              
                }}
           />
        </>
    )
}