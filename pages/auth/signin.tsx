import DesktopSignInPage from "@/desktop_ver/desk_pages/auth/desk_signin";
import { useWindowSize } from "@/context/window_size";
import MobilSignInPage from "@/mobile_ver/mob_pages/auth/mob_signin";

export default function SignInPage() {


  // in gust layout 

   const { isMobile } = useWindowSize();


  return isMobile ?   <MobilSignInPage /> : <DesktopSignInPage />
  
}