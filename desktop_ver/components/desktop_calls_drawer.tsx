import * as React from 'react';

import { useThemeContext } from '@/context/theme_context';
import Box from '@mui/material/Box';
import { drawerWidth } from '@/lib/constants';

type Props = {
    children?: React.ReactNode
}

const DesktopCallsDrawer : React.FC<Props> = ({children})=> {

    const { bgColor} = useThemeContext()

  return (
    <Box 
        width={drawerWidth}
         bgcolor={bgColor}
        maxHeight={'90vh'}
         overflow={'scroll'}
         sx={{
          overflowX: 'hidden',
          scrollbarWidth: 'none',
        }}
         
         >
        {children}
    </Box>
  );
}

export  default DesktopCallsDrawer
