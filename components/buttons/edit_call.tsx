import  Button, { ButtonProps }  from "@mui/material/Button"

type Props = {
    callId : string
    technicianId? : string
    btnProps ?: ButtonProps
}


const EditCallButton : React.FC<Props> = ({callId , technicianId , btnProps}) => {
    
    return (
        <Button
        variant='contained'
        size='small'
        {...btnProps}
        >
        עדכן
        </Button>
    )
}

export default EditCallButton