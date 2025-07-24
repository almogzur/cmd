import { useWindowSize } from "@/context/window_size"
import { Typography, useFormControl ,useTheme} from "@mui/material"
import { CSSProperties } from "react"

interface controlledLabelType {
    labelPosition:"top"|"end"
    label:string
    isLabelBold?:boolean
    labelTextColor?:CSSProperties['color']


}
 const ControlledLabel =({labelPosition,label ,isLabelBold  ,labelTextColor}:controlledLabelType)=>{
    const theme = useTheme()

  const { isMobile} = useWindowSize()

    const { focused , filled, variant ,error,color, ..._rest } = useFormControl() || {};
  //  console.log(rest);
    
          const  fullWidth= 1000
    
      return   (
      <Typography   
           sx={
            focused?
                [ {   
                 width:labelPosition==="end"? fullWidth*0.11 : fullWidth,
                 color:error? "red" : color?theme.palette[`${color}`].main : null,

                 fontWeight: isLabelBold? "bold": null,

                  },
                 variant==="outlined"&&
                  {
                   position:"relative",
                   top: 3 ,
                   p:1
                 },
                 {
                  color:error? "red": color? theme.palette[`${color}`].main  :undefined,    
                 }
                ]
                 :
            filled ?
                 [
                 {
                  width:labelPosition==="end"? fullWidth*0.11 : fullWidth,
                  color:error? "red":undefined,
                  fontWeight: isLabelBold? "bold": null,

                 },
                 variant==="outlined"&&
                 {
                  position:"relative",
                  top: -50 ,
                  p:1
                 },
                 {
                  color:error? "red":undefined,
                 }
               ,{
              
                fontSize:isMobile ?  14:18,
              }
                ]      
                :
                {
                 width:fullWidth,
                 fontWeight: isLabelBold? "bold": null,
                 fontSize:isMobile? 14:18,
                 position:"relative",
                 opacity:1,
                 color:labelTextColor?? null
                 
                 }
                }
            >
        {label}
        </Typography>)
    


}

export default ControlledLabel

