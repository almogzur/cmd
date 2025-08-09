import { CMDDataGridOptions } from "../admin/admin_call_table_config";

 export const UserTableDefaultsOptions : CMDDataGridOptions = {
 // IDs & Dimensions
  rowHeight: 50,
  columnHeaderHeight: 50,
  columnBufferPx: 3000,
  rowBufferPx: 20,
  
  scrollbarSize: 20,


  // Pagination
  pagination: true,
  
  rowCount: 20,
  paginationMode: 'server',
   
  autoPageSize: false,

  // Sorting
  sortingMode: 'client',
  sortModel: [{ field: 'id', sort: 'asc' }],

  // Filtering
  filterMode: 'server' ,

  ignoreDiacritics: true,

  // Selection
  checkboxSelection: false,
  
  disableRowSelectionOnClick: true,
  rowSelection: false,

  // Editing
  editMode: "row",

  // Column config
  disableColumnMenu: false,
  disableColumnSelector: false,
  disableDensitySelector: false,

  // Toolbar & Footerx
  hideFooter: true,
  hideFooterPagination: true,
  
  hideFooterSelectedRowCount: true,

  // Display
  autoHeight: true,
  virtualizeColumnsWithAutoRowHeight: true,
  density: "standard",
  loading: false,
  showCellVerticalBorder: true,
  showColumnVerticalBorder: true,
  disableColumnSorting: true,
  disableColumnResize: true,

  
}
