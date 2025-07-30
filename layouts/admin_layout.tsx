import AdminSidebar from "@/components/admin/admin_side_bar"
import { useWindowSize } from "@/context/window_size";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children?: React.ReactNode }) {


  const { isMobile, } = useWindowSize();

  const sideBarWidth = isMobile ? '60px' : '80px';

      const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load

    if (!session || session.user.role !== "ADMIN") {
      router.replace("/");
    }
  }, [session, status, router]);

    return (
     <Box 
     width={`calc(100% - ${sideBarWidth})`} >
     <AdminSidebar />
       {children}
    </Box>
    )
}