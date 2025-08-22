import { useThemeContext } from "@/context/theme_context";
import TechnicianTopNavbar from "@/mobile_ver/layouts/layout_components/tech/topbar"
import { Box } from "@mui/material";


type Props = {
  children?: React.ReactNode
}

const MobilTechniciansLayout: React.FC<Props> = ({ children }) => {


  const {  bgColor, } = useThemeContext();
  return (
    <Box minHeight={'100vh'}  bgcolor={bgColor} >
      <TechnicianTopNavbar />
      {children}
    </Box>
  );
};

export default MobilTechniciansLayout 