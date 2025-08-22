import { useDesktopTechComponent } from "@/context/desktop_tech_selected_component";
import { useThemeContext } from "@/context/theme_context";
import { IndicatorColor } from "@/lib/constants";
import { Home, Person } from "@mui/icons-material";
import { SxProps, Tab } from "@mui/material";
import { blue } from "@mui/material/colors";
import Tabs from "@mui/material/Tabs"
import { useState } from "react";
import DatasetIcon from '@mui/icons-material/Dataset';
import BiotechIcon from '@mui/icons-material/Biotech';


import ServiceRecordsPage from "@/desktop_ver/desk_pages/admin/servicerecords";
import TechnicianPage from "@/desktop_ver/desk_pages/admin/technician";



const TechDesktopTabs: React.FC = () => {

    const [value, setValue] = useState<number>(1);
    const { textColor, isDarkMode } = useThemeContext()
    const { setSelectedComponent } = useDesktopTechComponent()

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const SelectStyle: SxProps = {
        color: textColor,
        '&.Mui-selected': {
            color: IndicatorColor,
        },
    };

    return (
        <Tabs
            value={value}
            onChange={handleChange}
            allowScrollButtonsMobile
            variant='scrollable'
            aria-label="wrapped label tabs example"
            textColor='secondary'


            slotProps={{
                indicator: {
                    style: {
                        backgroundColor: blue[400],
                        boxShadow: isDarkMode ? ` 0 0px 10px  .3em ${blue[500]} ` : undefined
                    }
                },
                root: {
                    sx: {
                        width: '100%',
                        mr: 2

                    }
                },
                startScrollButtonIcon: {
                    sx: { color: textColor }
                },
                endScrollButtonIcon: {
                    sx: { color: textColor }
                }

            }}
        >
            <Tab
                value={1}
                label='ראשי'
                icon={<Home />}
                sx={{ ...SelectStyle }}

            />

            <Tab
                value={4}
                label="פרופיל"
                icon={<Person />}
                sx={{ ...SelectStyle }}
  
            />

        </Tabs>
    )

}

export default TechDesktopTabs