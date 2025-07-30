import CallsTable from "@/components/calls_table";
import AdminColumns from "@/componentsProps/admin_cols";
import AdminLayout from "@/layouts/admin_layout";
import { useAdminServiceCalls } from "@/lib/hooks/use_admin_service_calls";
import { Typography } from "@mui/material";
import { useSession } from "next-auth/react";

export default function AdminMainPage() {


    const { serviceCalls, isError, isLoading } = useAdminServiceCalls()
    const { data: session } = useSession();

    if(isLoading || !serviceCalls) return <div>Loading...</div>

    if(isError) return <div>Error</div>

    return( 
    <AdminLayout >
        <Typography>שלום {session?.user.name}</Typography>
        <CallsTable
             serviceCalls={serviceCalls}
            columnsProps={AdminColumns()}
          />

    </AdminLayout>
    )
}