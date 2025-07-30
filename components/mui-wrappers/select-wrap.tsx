import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, SelectProps, SxProps, TextFieldVariants, Typography, useFormControl, useTheme } from "@mui/material"
import { CSSProperties, ReactElement, ReactNode, } from "react"


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
  helpText: string

  /** Util  */
  isError?: boolean
  icon?: ReactElement<unknown>

  /** Style */
  variant?: TextFieldVariants


  //Value 
  isValueBold?: boolean
  valueColor?: CSSProperties['color']


  //Label
  labelColor?: CSSProperties["color"]
  isLabelBold?: boolean

  // Item list 
  isListItemBold?: boolean

  Fgrow?: number
  hoverColor?: CSSProperties['color']
  m?: number | "auto"
  bg?: CSSProperties['color']

  /** Labels - Style Positions */

  helpTextPotionsEnd?: boolean

}

const SelectWrap = ({
  helpText,
  items,
  changeHandler,
  m,
  hoverColor,
  bg,

  label,
  icon,
  variant,

  value,
  isListItemBold,
  isValueBold,
  isLabelBold,
  Fgrow,
  helpTextPotionsEnd,
  isError,
  valueColor,
  labelColor


}: SelectWrapType) => {



  return (
    <FormControl fullWidth variant={variant}  >

      <InputLabel
        sx={{
          color: labelColor ?? "black",
          fontWeight: isLabelBold ? 'bold' : null,
          width: "100%",
          display: "flex",
          flexDirection: "row-reverse",
          textAlign: "end",
          mx:-3,
          '&.Mui-focused': {
            color: 'red',
            transform: 'none',
          },

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
        style={{ fontWeight: isValueBold ? "bold" : undefined, color: valueColor }}
        sx={{
          // add icon position add option based on top and end title positions
          flexGrow: Fgrow ?? null,
          bgcolor: bg,
          p: 0,
          '&:hover': {
            backgroundColor: hoverColor,
          },
          ".MuiInputBase-input": { textAlign: "end",  },
        }}
      >
        {items.map(({ label, value }, i) => {
          return <MenuItem

            sx={{
              fontWeight: isListItemBold ? "bold" : null,
              width: "100%",
              display: "flex",
              flexDirection: "row-reverse",
            }}
            key={label + i + "select-item"}
            value={value}
          >
            {label}

          </MenuItem>
        })}

      </Select>
      {helpText && 
      <SelectHelpText helpText={helpText} />
      }
    </FormControl>
  )
}


interface SelectHelpTextType {
  helpText: string

}

export function SelectHelpText({ helpText }: SelectHelpTextType) {


  return <FormHelperText
  >{helpText}
  </FormHelperText>
}



export default SelectWrap