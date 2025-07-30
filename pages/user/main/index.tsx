import CallsTable from "@/components/calls_table";
import UserCols from "@/componentsProps/user_cols";
import UserLayout from "@/layouts/user_layout";
import { useServiceCalls } from "@/lib/hooks/use_user_service_calls";
import { useSession } from "next-auth/react";

export default function UserMainPage({ children }: { children: React.ReactNode }) {

    const { data: session } = useSession();

    const userId = session?.user.id
      
    const { serviceCalls, isLoading, isError } = useServiceCalls(userId);

    
    if(isLoading || !serviceCalls) return <div>Loading...</div>

    if(isError) return <div>Error</div>
    
    return( 
    <UserLayout>
        <CallsTable 
                columnsProps={UserCols()} 
                serviceCalls={serviceCalls}          
        />
            {children}
    </UserLayout>
    )
}