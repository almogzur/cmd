import { Autocomplete, MenuItem, TextField, TextFieldProps } from "@mui/material";
import ControlledLabel from '@/components/mui-wrappers/controlled-form-label';
import ControlledHelperText from '@/components/mui-wrappers/controlled-helper-text';
import { InputWrapPropsType } from "@/components/mui-wrappers/input-wrap";



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
       Fgrow ,
       bg,
       helpText,
       helpTextPotionsEnd,
       isDisabled,
       hoverColor,
       labelPosition,
       textFieldProps,

       ..._rest
       
         }:AutoCompleteInputWrapPropsType){

    return(    

    
    <Autocomplete
        freeSolo
        slotProps={{listbox:{}}}
        options={AutocompleteOptionArray??[]}     
        
        sx={{
          flexGrow: Fgrow ?? null,
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
             helperText={helpText && <ControlledHelperText text={helpText} helpTextPotionsEnd={helpTextPotionsEnd??false} />}
            variant={variant ?? 'standard'}
            label={<ControlledLabel labelPosition={labelPosition} label={label} />}
        
            
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