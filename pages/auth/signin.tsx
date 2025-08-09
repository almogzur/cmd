import DesktopSignInPage from "@/desktop_ver/desk_pages_markup/auth/desk_signin";
import { useWindowSize } from "@/context/window_size";
import MobilSignInPage from "@/mobile_ver/mob_pages_markup/auth/mob_signin";

export default function SignInPage() {


  // in gust layout 

   const { isMobile } = useWindowSize();


  return isMobile ?   <MobilSignInPage /> : <DesktopSignInPage />
  
}