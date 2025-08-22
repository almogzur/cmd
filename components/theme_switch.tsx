import { useThemeContext } from "@/context/theme_context";
import { Stack, StackProps, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeSharpIcon from '@mui/icons-material/LightModeSharp';
import { blue } from "@mui/material/colors";

type Props = {
 
  value: boolean
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  switchProps?: SwitchProps
  stackProps?: StackProps
  

}

const ThemeSwitch : React.FC<Props> = ({  onChangeHandler, value, switchProps , stackProps }: Props) => {

  const { isDarkMode  } = useThemeContext()

  return (
    <Stack   
        direction={'row'}
        alignItems={'center'}
        {...stackProps}
        > 

    <FormControlLabel
     sx={{p:0,m:0}}
      control={
        <Switch
          checked={value}
          onChange={onChangeHandler}

          {...switchProps}
        />
      }

      label={<Typography>{}</Typography>}
    />
       {isDarkMode ? <DarkModeIcon sx={{color:blue[200] }}  /> : <LightModeSharpIcon sx={{color:'black'}}/>}
    </Stack>
  );
};

export default ThemeSwitch