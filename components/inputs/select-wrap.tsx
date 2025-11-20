import { useThemeContext } from "@/context/theme_context"
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
  SxProps,
} from "@mui/material"

import { CSSProperties, ReactNode, } from "react"


export interface SelectItemType {
  value: string | number | readonly string[]
  label: string
}

type SelectWrapType =  {

  /** Required Items  */

  label: string
  items: SelectItemType[]

  selectSxProps?: SxProps
  labelSxProps?: SxProps
  formControlSxProps?: SxProps
  inputStyle?: CSSProperties
  selectProps?: SelectProps

}

interface SelectHelpTextType {
  helpText: string

}

const SelectWrap = ({
  items,
  label,

  selectSxProps,
  labelSxProps,
  formControlSxProps,
  inputStyle,
selectProps
}: SelectWrapType
) => {

  const { textColor } = useThemeContext()

  return (
    <FormControl
      fullWidth
  
      sx={{
        ...formControlSxProps
      }}
    >

      <InputLabel
        sx={{
          display: "flex",

          transition: 'none',
          '&.Mui-focused': {
            color: 'red',
            transform: 'none',
          },

          ...labelSxProps
        }}
      >
        {label}
      </InputLabel>

      <Select
        labelId={label}

        label={label}
        {...selectProps}
        // selected item 

        sx={{
          // add icon position add option based on top and end title positions
          ".MuiInputBase-input": { textAlign: "start", ...inputStyle },
          "& .MuiOutlinedInput-notchedOutline": {
                borderColor: textColor
        },

          ...selectSxProps
        }}
      >
        {items.map(({ label, value }, i) => {
          return <MenuItem
            key={label + i + "select-item"}
            value={value}
          >
            {label}
          </MenuItem>
        })}

      </Select>



      

    </FormControl>
  )
}


export function SelectHelpText({ helpText }: SelectHelpTextType) {


  return <FormHelperText
  >{helpText}
  </FormHelperText>
}


export default SelectWrap