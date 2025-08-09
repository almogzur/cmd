'use client';

import React from 'react';
import { type GridColDef } from '@mui/x-data-grid';
import { ServiceCalls } from '@prisma/client';
import { CMDDataGridOptions } from './data_grid_props/admin/admin_call_table_config';
import { translations } from '@/desktop_ver/desk_components/data_grid/data_grid_props/local_text'

import { DataGrid } from '@mui/x-data-grid';
import CallsFilterOptionsMenu from '@/components/menus/calls_filter_options_menu';
import Settings from '@mui/icons-material/Settings';
import { useThemeContext } from '@/context/theme_context';
import { Stack } from '@mui/material';


export type TableProps = {
  serviceCalls: ServiceCalls[]
  columnsProps: GridColDef[]
  tableProps?: CMDDataGridOptions
};

const CallsTable: React.FC<TableProps> = ({
  serviceCalls,
  columnsProps,
  tableProps
}) => {

  const { textColor } = useThemeContext()


  return (
    <>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'end'}
      >
        <CallsFilterOptionsMenu
          Icon={<Settings sx={{ scale: 1.1, color: textColor }} />}
          btnProps={{

          }}
        />
      </Stack>
      
      <DataGrid
        sx={{
          fontSize: '0.75rem',
          mb: 10,
          direction: 'rtl',

        }}

        localeText={translations}
        rows={serviceCalls}
        columns={columnsProps}

        {...tableProps}

      />

    </>
  );
};

export default CallsTable;
