
import Box  from "@mui/material/Box";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import MobilAdminTopbar from "@/mobile_ver/layouts/layout_components/admin/mob_admin_topbar";
import { useThemeContext } from "@/context/theme_context";


export default function MobilAdminLayout({ children }: { children?: React.ReactNode }) {


  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load

    if (!session || session.user.role !== "ADMIN") {
      router.push("/");
    }
  }, [session, status, router]);

  const { bgColor }= useThemeContext()

  

  return (

        <Box sx={{  minHeight: '100vh'  }}   bgcolor={ bgColor} >
          <MobilAdminTopbar/>
          
          {children}
        
        </Box>


  )
}