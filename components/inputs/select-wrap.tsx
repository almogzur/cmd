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

type SelectWrapType = SelectProps & {

  /** Required Items  */

  label: string
  items: SelectItemType[]
  value: string,
  changeHandler: (event: SelectChangeEvent<string>, child: ReactNode) => void
  helpText?: string
  selectSxProps?: SxProps
  labelSxProps?: SxProps
  formControlSxProps?: SxProps
  inputStyle?: CSSProperties
}

interface SelectHelpTextType {
  helpText: string

}

const SelectWrap = ({
  items,
  changeHandler,
  label,
  variant,
  value,
  helpText,
  selectSxProps,
  labelSxProps,
  formControlSxProps,
  inputStyle,
}: SelectWrapType
) => {

  const { textColor } = useThemeContext()

  return (
    <FormControl
      fullWidth
      variant={variant}
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
        value={value ?? ""}
        onChange={changeHandler}
        label={label}
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


      {helpText &&
        <SelectHelpText
          helpText={helpText}
        />
      }

    </FormControl>
  )
}


export function SelectHelpText({ helpText }: SelectHelpTextType) {


  return <FormHelperText
  >{helpText}
  </FormHelperText>
}


export default SelectWrap