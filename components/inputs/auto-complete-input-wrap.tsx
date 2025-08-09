import { Autocomplete, MenuItem, TextField, TextFieldProps } from "@mui/material";
import { InputWrapPropsType } from "./input-wrap";



interface AutoCompleteInputWrapPropsType  extends Omit<InputWrapPropsType, 'multiline'>    {
  
    AutocompleteOptionArray:string[]
    textFieldProps?:TextFieldProps
    
}

export default function AutoCompleteInputWrap ({
       AutocompleteOptionArray , 
       inputType,
       label,
       value, 
       onChangeHandler,
       isRequired,
       stateName,
       variant,

       bg,
       helpText,
       helpTextPotionsEnd,
       isDisabled,
       hoverColor,

       textFieldProps,

       ..._rest
       
         }:AutoCompleteInputWrapPropsType){

    return(    

    
    <Autocomplete
        freeSolo
        slotProps={{listbox:{}}}
        options={AutocompleteOptionArray??[]}     
        
        sx={{
  
          bgcolor: bg,

          '&:hover': {
            backgroundColor: hoverColor,
                   
          },
         }}
         autoHighlight
        clearOnEscape
        disableClearable
        openOnFocus
        renderInput={(params) =>  
            <TextField
            {...params}
            id={label}
            type={inputType} //default to text
            value={value ?? ""}
            onChange={onChangeHandler}
            required={isRequired}
            disabled={isDisabled}
            name={stateName}
             helperText={""}
            variant={variant ?? 'standard'}
            label={label}
        
            
             {...textFieldProps}
           />
         }
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
  
          return (
            <MenuItem key={key} {...optionProps} style={{width:"100%" , direction:"rtl"}}>
                  {option}
            </MenuItem>
          );
        }}
        />  
        
        )
}