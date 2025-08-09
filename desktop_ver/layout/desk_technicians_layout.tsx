import DesktopTechnicianTopNavbar from '@/desktop_ver/layout/layout_components/technician/desk_technician_top_bar'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function DesktopTechniciansLayout({children}:{children?: React.ReactNode}) {
    
          const router = useRouter();
          const { data: session, status } = useSession();
        
          useEffect(() => {
            if (status === "loading") return; // Wait for session to load
        
            if (!session || (session.user.role !== 'TECHNICIAN' && session.user.role !== 'ADMIN')) {
              router.push("/");
            }
          }, [session, status, router]);
    
    return (

        

        <div>
            <DesktopTechnicianTopNavbar/>
            {children}
        </div>
    )
}