'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Box, Typography, Button, Stack } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import { ServiceCall } from '@/lib/zod/types';
import { useWindowSize } from '@/context/window_size';

const DataGrid = dynamic(
  () => import('@mui/x-data-grid').then((mod) => mod.DataGrid),
  { ssr: false }
);

type Props = {
  serviceCalls: ServiceCall[];
};

const ServiceCallsTable: React.FC<Props> = ({ serviceCalls }) => {
  const { isMobile } = useWindowSize();

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
      renderCell: (params) => (
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

  return (
    <Box sx={{ width: '100%', direction: 'rtl' }}>
      <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
        קריאות שירות
      </Typography>
      <DataGrid
        sx={{
          direction: 'rtl',
          fontSize: isMobile ? '0.75rem' : '1rem',
          mb: 20,
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
          '& .MuiDataGrid-cell:focus-within': {
            outline: 'none',
          },

        }}
        rows={serviceCalls}
        columns={columns}

        getRowId={(r) => r.id}

        hideFooter
        disableColumnResize
        disableColumnMenu
        disableRowSelectionOnClick
        disableEval
        disableVirtualization
        disableAutosize










      />
    </Box>
  );
};

export default ServiceCallsTable;
