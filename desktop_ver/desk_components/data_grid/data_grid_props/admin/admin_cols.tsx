


import CallActionMenu from "@/components/menus/call_action_menu";
import type { GridColDef } from "@mui/x-data-grid";

import React from "react";




const AdminColumns  = () : GridColDef[] => {


  const columns: GridColDef[] = [
        {
      field: 'actions',
      headerName: 'פעולות',
      width: 80,
      sortable: false,
      filterable: false,
      display: 'flex',
      align:'left',
      renderCell: (params) => {

        return(
        <CallActionMenu 
            callId={params.row.id}
            menuProps={{
              slotProps:{

              }
            }}
          />
        )
      }
      ,
    },
    { field: 'id', headerName: 'מזהה', width: 180, },
    

    {
      field: 'description',
      headerName: 'תיאור',
      width: 120,
      display: 'flex',
      align: 'left',
    },
    {
      field: 'status',
      headerName: 'סטטוס',
      width: 100,
      display: 'flex',
      align: 'left',

    },
    {
      field: 'assignee',
      headerName: 'מטפל',
      width: 70,
      display: 'flex',
      align:'left',

    },
    {
      field: 'location',
      headerName: 'מיקום',
      width: 100,
      display: 'flex',
      align:'left',
    },
    {
      field: 'createdAt',
      headerName: 'נפתח בתאריך',
      width: 140,
      display: 'flex',
      align:'left',
    },
    {
      field: 'updatedAt',
      headerName: 'עודכן בתאריך',
      width: 140,
      display: 'flex',
      align:'left',

    },


  ];

  return columns

}

export default AdminColumns


