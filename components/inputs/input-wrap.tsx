import { SxProps, TextField, TextFieldProps, Typography, } from "@mui/material"
import { ChangeEventHandler, CSSProperties, ReactNode, RefObject } from "react";

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

export type  InputWrapPropsType = TextFieldProps & {

  
  /** required Fields  */
  label: string
  value: string | number | undefined
  onChangeHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  /** required Fields  */
  

  helpText?: string | undefined
  inputType?: HTMLInputTypes
  isRequired?: boolean
  error?: boolean
  isDisabled?: boolean
  
  ref?: RefObject<HTMLInputElement>

  Icon?: ReactNode

  placeholder?: string
  placeholderStyle?: CSSProperties


  /** !!! this is extension for Text-input-wrap . if you change this also change the ref wrap  */
  multiline?: true;
  rows?: number;


  /*Labels*/
  isLabelBold?: boolean
  isValueBold?: boolean
  valueTextColor?: CSSProperties['color']
  hoverColor?: CSSProperties['color']
  bg?: CSSProperties['color']
  sxProps?: SxProps
  /**   Style Positions */
  helpTextPotionsEnd?: boolean
  stateName?: string // the name of the state to update in the event 

}


const InputWrap = ({
  inputType,
  label,
  value,
  onChangeHandler,
  isRequired,
  stateName,
  error,
  helpText,
  isDisabled,
  hoverColor,
  ref,
  rows,
  multiline,
  placeholder,
  isLabelBold,
  placeholderStyle,
  valueTextColor,
  isValueBold,
  sxProps,
  ...rest
}: InputWrapPropsType) => {

  return (

    <TextField
      sx={{
        direction: 'rtl',
        '&:hover': {
          backgroundColor: hoverColor,
        },
        "& .MuiInputBase-input::placeholder": placeholderStyle
      }}
      id={label}
      type={inputType} //default to text
      value={value ?? ""}
      onChange={onChangeHandler}
      required={isRequired}
      disabled={isDisabled}
      name={stateName}
      helperText={helpText}
      label={
        <Typography
          fontWeight={isLabelBold ? "bold" : undefined}
        >  {label}
        </Typography>
        }
      error={error}
      ref={ref}
      multiline={multiline}
      rows={rows}
      slotProps={{
        inputLabel: {
          sx: {
            direction: 'rtl',
            textAlign: 'start',
            width: '100%',
            display: 'flex',
            transform: 'none',
            '&.Mui-focused': {
              color: 'red',
              transform: 'none',
            }, 
            '&.Mui-shrink': {
              color: 'red'
            },
           ...sxProps
          },
        },
        input: {
          placeholder,
          dir: 'rtl',
          style: {
            fontWeight: isValueBold ? "bold" : undefined,
            color: valueTextColor,
          },

        }
      }}
      {...rest}
    />



  )
}
export default InputWrap

