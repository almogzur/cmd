import { blue } from "@mui/material/colors";

const drawerWidth = 240;
 const IndicatorColor = blue[500];

  const DotColor = (status: string) => {
    switch (status) {
      case 'LOW': return '#b2f2bb';
      case 'MEDIUM': return '#ffd6a5';
      case 'HIGH': return '#ffadad';
      case 'CRITICAL': return '#ff8787';
      default: return '#dbeafe';
    }
  };


export { drawerWidth , DotColor , IndicatorColor};



