import { useThemeContext } from "@/context/theme_context";
import { Stack, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";


type Props = {
  label: string
  value: boolean
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  SwitchProps?: SwitchProps
}

const SwitchWrap = ({ label, onChangeHandler, value, SwitchProps }: Props) => {

  const { textColor } = useThemeContext()

  return (
    <Stack   direction={'row'} alignItems={'center'} gap={1}   > 

    <FormControlLabel
    sx={{p:0,m:0}}
      control={
        <Switch
          checked={value}
          onChange={onChangeHandler}

          {...SwitchProps}
        />
      }

      label={<Typography color={textColor} >{label}</Typography>}
    />

    </Stack>
  );
};

export default SwitchWrap