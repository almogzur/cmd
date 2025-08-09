import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Box from "@mui/material/Box"
import AdminDeskTopNavbar from "./layout_components/admin/desk_admin_top_bar"
import { useThemeContext } from "@/context/theme_context";


const  DesktoAdminLayout = ({ children }: { children?: React.ReactNode }) => {

      const router = useRouter();
      const { data: session, status } = useSession();
      const { bgColor }= useThemeContext()
    
      useEffect(() => {
        if (status === "loading") return; // Wait for session to load
    
        if (!session || session.user.role !== "ADMIN") {
          router.push("/");
        }
      }, [session, status, router]);
      
    return (
        <Box sx={{  minHeight: '100vh' , bgcolor: bgColor}} >
            <AdminDeskTopNavbar/>
            {children}

        </Box>
    )
}

export default DesktoAdminLayout