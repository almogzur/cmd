'use client';

import { AdminTableDefaultOptions , CMDDataGridOptions } from '@/desktop_ver/desk_components/data_grid/data_grid_props/admin/admin_call_table_config';
import React, { createContext, useContext, useState, ReactNode } from 'react';


const AdminDataGridOptionsContext = createContext<{
  options: CMDDataGridOptions;
  setOptions: React.Dispatch<React.SetStateAction<CMDDataGridOptions>>;
}>({
  options: AdminTableDefaultOptions,
  setOptions: () => {},
});

export const useAdminDataGridOptions = () => useContext(AdminDataGridOptionsContext);

export const AdminDataGridOptionsProvider = ({ children }: { children: ReactNode }) => {

  const [options, setOptions] = useState<CMDDataGridOptions>(AdminTableDefaultOptions);

  return (
    <AdminDataGridOptionsContext.Provider value={{ options, setOptions }}>
      {children}
    </AdminDataGridOptionsContext.Provider>
  );
};
