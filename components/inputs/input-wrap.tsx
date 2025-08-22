import { useThemeContext } from "@/context/theme_context";
import { SxProps, TextField, TextFieldProps, Typography, } from "@mui/material"
import { ChangeEventHandler, } from "react";

type HTMLInputTypes =
  | "color"
  | "date"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

export type InputWrapPropsType = Omit<TextFieldProps, 'sx'|'slotProps'> & {


  /** required Fields  */
  label: string
  value: string | number | undefined
  onChangeHandler?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  /** required Fields  */
  helpText?: string | undefined
  inputType?: HTMLInputTypes

  sxProps?: SxProps
  /**   Style Positions */
}


const InputWrap = ({
  inputType,
  label,
  value,
  onChangeHandler,
  helpText,
  sxProps,
...rest 
  
}: InputWrapPropsType) => {

  const { textColor } = useThemeContext()

  return (

    <TextField
      sx={{
        direction: 'rtl',
        "& fieldset": {
          borderColor: textColor,
        },
        ...sxProps,
      }}
      id={label}
      type={inputType} //default to text
      value={value ?? ""}
      onChange={onChangeHandler}
      helperText={helpText}
      label={
        <Typography
        >  {label}
        </Typography>
      }

      slotProps={{
        inputLabel: {
          sx: {
            direction: 'rtl',
            textAlign: 'start',
            width: '100%',
            display: 'flex',
            transform: 'none',
            '&.Mui-focused': {
              transform: 'none',
            },
          },
          },
         }
         
        }

{...rest}
    />


        
  )
}
export default InputWrap

