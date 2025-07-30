'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Box, Typography } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import { useWindowSize } from '@/context/window_size';
import { ServiceCalls } from '@prisma/client';

const DataGrid = dynamic(
  () => import('@mui/x-data-grid').then((mod) => mod.DataGrid),
  { ssr: false }
);

type Props = {
  serviceCalls: ServiceCalls[];
  columnsProps: GridColDef[];
};

const CallsTable: React.FC<Props> = ({ serviceCalls , columnsProps}) => {
  const { isMobile } = useWindowSize();


  return (
    <Box sx={{ width: '100%', direction: 'rtl' }}>
      <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
        קריאות שירות
      </Typography>
      <DataGrid
        sx={{
          direction: 'rtl',
          fontSize: isMobile ? '0.75rem' : '1rem',
          mb: 30,
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
          '& .MuiDataGrid-cell:focus-within': {
            outline: 'none',
          },

        }}
        rows={serviceCalls}
        columns={columnsProps}

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

export default CallsTable;
