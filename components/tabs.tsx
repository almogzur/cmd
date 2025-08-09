import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import { blue } from '@mui/material/colors';
import DatasetIcon from '@mui/icons-material/Dataset';
import BiotechIcon from '@mui/icons-material/Biotech';
import {SxProps}  from '@mui/material/styles';
import Person from '@mui/icons-material/Person';
import Home from '@mui/icons-material/Home';
import { useThemeContext } from '@/context/theme_context';

export default function TabsComponent() {

    const [value, setValue] = useState<number>(1);

    const {  textColor , isDarkMode }= useThemeContext()

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    const IndicatorColor = blue[500];

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
            sx={{}}
            slotProps={{
                indicator: {
                    style: {
                        backgroundColor: blue[400],
                        boxShadow: isDarkMode ? ` 0 0px 10px  .3em ${blue[500]} `:undefined
                    }
                },
                root: {
                    sx: {
                        width: '100%',
                        mr:2
                      
                    }},
                    startScrollButtonIcon:{
                        sx:{color:textColor}
                    },
                    endScrollButtonIcon:{
                        sx:{color:textColor}
                    }
                    
            }}
        >
            <Tab
                value={1}
                label='ראשי'
                icon={<Home />}
                sx={{ ...SelectStyle}}


            />
 

            <Tab
                value={2}
                label="טכנאים"
                icon={<BiotechIcon />}
                sx={{ ...SelectStyle }}
            />

            <Tab
                value={3}
                label="רישומי שירות"
                sx={{ ...SelectStyle }}
                icon={<DatasetIcon />}
            />
             <Tab
                value={4}
                label="פרופיל"
                icon={<Person />}
                sx={{ ...SelectStyle }}
            />

        </Tabs>
    );
}