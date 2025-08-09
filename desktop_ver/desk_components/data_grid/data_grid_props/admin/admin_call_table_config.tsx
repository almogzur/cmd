import { DataGridProps } from "@mui/x-data-grid";


export type CMDDataGridOptions  = Omit<DataGridProps , 'rows' | 'columns'>


export const AdminTableDefaultOptions :  CMDDataGridOptions  = {

  rowHeight: 50,
  columnHeaderHeight: 50,


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
  filterMode: 'client' ,

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

  // Toolbar & Footer
  hideFooter: true,
  hideFooterPagination: true,
  hideFooterSelectedRowCount: true,

  // Display
  autoHeight: true,
  virtualizeColumnsWithAutoRowHeight: true,
  density: "standard",
  loading: false,
  
  showCellVerticalBorder: false,

  showColumnVerticalBorder: false,

  disableColumnSorting: true,

  disableColumnResize: false,

  

  

  

};






