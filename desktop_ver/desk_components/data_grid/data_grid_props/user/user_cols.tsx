
import Stack from "@mui/material/Stack";
import  Button  from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { GridColDef } from "@mui/x-data-grid";
import DeleteCallButton from "@/components/buttons/delete_call_btn";


const  UserCols = () => {

  const chipColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "#1cbe73";
      case "IN_PROGRESS":
        return "red";
      case "PENDING":
        return "blue";
        case "DONE":
        return "yellow";
      default:
        return "gray";
    }
  }

  const hebText = (text: string) => {
    switch (text) {
      case "NEW":
        return "חדש";
      case "IN_PROGRESS":
        return "בתהליך";
      case "PENDING":
        return "בהמתנה";
        case "DONE":
        return "בוצע";
      default:
        return "חדש";
    }
  }
  const columns: GridColDef[] = [
 
    { field: 'id', headerName: 'מזהה', width: 160, display: 'flex' },

    {
      field: 'description',
      headerName: 'תיאור התקלה ',
      width: 120,
      display: 'flex',

    },
    {
      field: 'status',
      headerName: 'סטטוס',
      width: 100,
      
      renderCell: (params) => (
        <Stack 
          direction={'row'}
  
          alignItems={'center'}
          justifyContent={'center'}
          width={80}
          height={50}
          >
          <Chip
               sx={{bgcolor:chipColor(params.row.status),color:'white' ,width:120,height:20}}
               label={hebText(params.row.status)} 
               />
        </Stack>
      )
    },
    {
      field: 'assignee',
      headerName: 'טכני ',
      width: 70,
      display: 'flex'

    },
    {
      field: 'location',
      headerName: 'מיקום',
      width: 100,
      display: 'flex'
    },
    {
      field: 'createdAt',
      headerName: 'נפתח בתאריך',
      width: 140,
      display: 'flex'
    },
    {
      field: 'updatedAt',
      headerName: 'עודכן בתאריך',
      width: 140,
      display: 'flex'

    },
    {
      field: 'actions',
      headerName: 'פעולות',
      width:  300 ,
      sortable: false,
      filterable: false,
      display: 'flex',
      renderCell: (_params) => (
        <Stack direction="column" gap={1}>

          <Button 
            variant='contained'
             size='small'
            sx={{width:100 , height:20}}
             >
            הצג/ערוך
          </Button>



          <DeleteCallButton 
          callId={_params.row.id} 
          btnProps={{sx:{width:100 , height:20}}}
          
          />

        </Stack>
      ),
    },
  ]
  
  return columns

}



export default UserCols