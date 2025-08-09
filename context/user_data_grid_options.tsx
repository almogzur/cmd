
import { CMDDataGridOptions } from '@/desktop_ver/desk_components/data_grid/data_grid_props/admin/admin_call_table_config';
import {  UserTableDefaultsOptions } from '@/desktop_ver/desk_components/data_grid/data_grid_props/user/user_call_table_config';
import  { createContext, useContext, useState, ReactNode } from 'react';



const UserDataGridOptionsContext = createContext<{
  options: CMDDataGridOptions;
  setOptions: React.Dispatch<React.SetStateAction<CMDDataGridOptions>>;
}>({
  options: UserTableDefaultsOptions,
  setOptions: () => {},
});

export const useUserDataGridOptions = () => useContext(UserDataGridOptionsContext);

export const UserDataGridOptionsProvider = ({ children }: { children: ReactNode }) => {

  const [options, setOptions] = useState<CMDDataGridOptions>(UserTableDefaultsOptions);

  return (
    <UserDataGridOptionsContext.Provider value={{ options, setOptions }}>
      {children}
    </UserDataGridOptionsContext.Provider>
  );
};
