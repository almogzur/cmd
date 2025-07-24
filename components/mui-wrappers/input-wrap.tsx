import {  TextField, TextFieldProps, TextFieldVariants, Typography,  } from "@mui/material"
import {ChangeEventHandler, CSSProperties, ReactNode, RefObject} from "react";
import ControlledHelperText from "./controlled-helper-text";
import ControlledLabel from "./controlled-form-label";

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

  export interface  InputWrapPropsType extends  Omit<TextFieldProps, 'variant'>  {

  /** required Fields  */    
    
    label:string
    value:string|number|undefined
    onChangeHandler:ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement|HTMLSelectElement>
    helpText:string|undefined

  /** util  */
     inputType?: HTMLInputTypes
     isRequired?:boolean
     error?:boolean
     isDisabled?:boolean
     ref?:RefObject<HTMLInputElement>

     Icon?:ReactNode

  // if provided alone will use label and place holder 
     placeholder?:string
     placeholderStyle?:CSSProperties

  // if provided will remove label and only display placeholder 
     placeholderMode?:boolean

  /** !!! this is extension for Text-input-wrap . if you change this also change the ref wrap  */
     multiline?: true;
     rows?: number;

 
     /** Styles Options  */

     styles?:CSSProperties

      /*Labels*/
      isLabelBold?:boolean
      

      isValueBold?:boolean
      valueTextColor?:CSSProperties['color']


     hoverColor?:CSSProperties['color']
     bg?:CSSProperties['color']

     variant?:TextFieldVariants
     Fgrow?:number
     m?:number|"auto"
    

     
    
    /**   Style Positions */
     helpTextPotionsEnd?:boolean



     stateName?:string // the name of the state to update in the event 
  
  }


const InputWrap = ({
     inputType,
     label,
     value, 
     onChangeHandler,
     isRequired,
     stateName,
     variant,
     Fgrow ,
     error,
     helpText,
     helpTextPotionsEnd,
     isDisabled,
     hoverColor,
     ref,
     styles,
     rows,
     multiline,
     placeholder,
     isLabelBold,
     placeholderStyle,
     valueTextColor,
     isValueBold,
     ...rest 
    }:InputWrapPropsType)=>{


    return(
     
    
     <TextField
      sx={{
      flexGrow: Fgrow ?? null,
      '&:hover': {
        backgroundColor: hoverColor,
      },
      "& .MuiInputBase-input::placeholder":placeholderStyle
    }}
      id={label}
      type={inputType} //default to text
      value={value ?? ""}
      onChange={onChangeHandler}
      required={isRequired}
      disabled={isDisabled}
      name={stateName}
      helperText={helpText ? <ControlledHelperText text={helpText} helpTextPotionsEnd={helpTextPotionsEnd??false} /> : null}
      variant={variant ?? 'standard'}
      label={<Typography
          fontWeight={isLabelBold?"bold":undefined}
          
          >
            {label}
           </Typography>}
      error={error}
      ref={ref}
      style={{...styles}}
      multiline={multiline}
      rows={rows}
      placeholder={placeholder} // string can't extends with ReactNode in SxProps
      slotProps={{
        input:{
          placeholder,
          style:{fontWeight:isValueBold?"bold":undefined, color:valueTextColor}}
        }}
      {...rest}
     />
     
    

    )
}
export default InputWrap

