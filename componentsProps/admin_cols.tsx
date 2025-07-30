import { useWindowSize } from "@/context/window_size"
import { Stack, Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

const AdminColumns = () => {

    const {isMobile} = useWindowSize()

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'מזהה', width: 80, display: 'flex' },
        { field: 'title', headerName: 'כותרת', width: 160, display: 'flex' },
        {
          field: 'description',
          headerName: 'תיאור',
          width: 120,
          display: 'flex',
        },
        {
          field: 'status',
          headerName: 'סטטוס',
          width: 100,
          display: 'flex'
        },
        {
          field: 'assignee',
          headerName: 'מטפל',
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
          width: isMobile ? 120 : 280,
          sortable: false,
          filterable: false,
          display: 'flex',
          renderCell: (_params) => (
            <Stack direction="row" gap={1}>
              <Button variant='contained' size='small'>
                הצג
              </Button>
              <Button variant="contained" size="small" color="primary">
                ערוך
              </Button>
    
              <Button variant="outlined" size="small">
                מחק
              </Button>
    
            </Stack>
          ),
        },
    ];

    return columns

}

export default AdminColumns