'use client';

import InputWrap from '@/components/inputs/input-wrap';
import SelectWrap from '@/components/inputs/select-wrap';
import SwitchWrap from '@/components/inputs/switch';
import { useAdminDataGridOptions } from '@/context/admin_data_grid_options';
import AdminLayout from '@/mobile_ver/layouts/mob_admin_layout';
import { Box, Typography, Stack, Divider } from '@mui/material';


import {GridDensity} from '@mui/x-data-grid'

const DataGridOptionsForm = () => {
  const { options, setOptions } = useAdminDataGridOptions();

  return (
    <AdminLayout>
      <Box sx={{ p: 3, direction: 'rtl', mb: 5 }}>
        <Typography variant="h5" gutterBottom>
          הגדרות טבלת נתונים
        </Typography>

        <Stack spacing={3}>
          <Divider textAlign="right">מידות ותצוגה</Divider>
          <Stack direction="row" gap={1} spacing={2} flexWrap="wrap">
            <InputWrap
              label="גובה שורה"
              type="number"
              value={options.rowHeight as number}
              onChangeHandler={(e) =>
                setOptions((prev) => ({ ...prev, rowHeight: Number(e.target.value) }))
              }
            />
            <InputWrap
              label="גובה כותרת"
              type="number"
              value={options.columnHeaderHeight as number}
              onChangeHandler={(e) =>
                setOptions((prev) => ({ ...prev, columnHeaderHeight: Number(e.target.value) }))
              }
            />
            <InputWrap
              label="טווח עמודות"
              type="number"
              value={options.columnBufferPx as number}
              onChangeHandler={(e) =>
                setOptions((prev) => ({ ...prev, columnBufferPx: Number(e.target.value) }))
              }
            />
            <InputWrap
              label="גודל פס גלילה"
              type="number"
              value={options.scrollbarSize as number}
              onChangeHandler={(e) =>
                setOptions((prev) => ({ ...prev, scrollbarSize: Number(e.target.value) }))
              }
            />
          </Stack>

          <Divider textAlign="right">תצוגה כללית</Divider>
          <Stack spacing={2}>
            <SwitchWrap
              label="גובה אוטומטי"
              value={options.autoHeight as boolean}
              onChangeHandler={(e) =>
                setOptions((prev) => ({ ...prev, autoHeight: e.target.checked }))
              }
            />
            <SelectWrap
              label="צפיפות"
              value={options.density as string}
              items={[
                { value: 'standard', label: 'רגיל' },
                { value: 'comfortable', label: 'נוח' },
                { value: 'compact', label: 'צפוף' },
              ]}
              changeHandler={(e) =>
                setOptions((prev) => ({ ...prev, density: e.target.value  as GridDensity }))
              }
              variant="outlined"
              sx={{ maxWidth: 200 }}
            />
            <SwitchWrap
              label="הצג גבולות תאים"
              value={options.showCellVerticalBorder as boolean}
              onChangeHandler={(e) =>
                setOptions((prev) => ({ ...prev, showCellVerticalBorder: e.target.checked }))
              }
            />
            <SwitchWrap
              label="הצג גבולות עמודות"
              value={options.showColumnVerticalBorder as boolean}
              onChangeHandler={(e) =>
                setOptions((prev) => ({ ...prev, showColumnVerticalBorder: e.target.checked }))
              }
            />
            <SwitchWrap
              label="בטל שינוי גודל תא"
              value={options.disableColumnResize as boolean}
              onChangeHandler={(e) =>
                setOptions((prev) => ({ ...prev, disableColumnResize: e.target.checked }))
              }
            />
          </Stack>

          <Divider textAlign="right">בחירה</Divider>
          <Stack spacing={2}>
            <SwitchWrap
              label="תיבת סימון לבחירה"
              value={options.checkboxSelection as boolean}
              onChangeHandler={(e) =>
                setOptions((prev) => ({ ...prev, checkboxSelection: e.target.checked }))
              }
            />
            <SwitchWrap
              label="נטרל בחירת שורה בלחיצה"
              value={options.disableRowSelectionOnClick as boolean}
              onChangeHandler={(e) =>
                setOptions((prev) => ({ ...prev, disableRowSelectionOnClick: e.target.checked }))
              }
            />
            <SwitchWrap
              label="אפשר בחירת שורות"
              value={options.rowSelection as boolean}
              onChangeHandler={(e) =>
                setOptions((prev) => ({ ...prev, rowSelection: e.target.checked }))
              }
            />
          </Stack>

          <Divider textAlign="right">תחתית הטבלה</Divider>
          <Stack spacing={2}>
            <SwitchWrap
              label="הסתר תחתית"
              value={options.hideFooter as boolean}
              onChangeHandler={(e) =>
                setOptions((prev) => ({ ...prev, hideFooter: e.target.checked }))
              }
            />
            <SwitchWrap
              label="הסתר עימוד בתחתית"
              value={options.hideFooterPagination as boolean}
              onChangeHandler={(e) =>
                setOptions((prev) => ({ ...prev, hideFooterPagination: e.target.checked }))
              }
            />
          </Stack>

          <Divider textAlign="right">עמודות וכלים בתחתית הטבלה</Divider>
          <Stack spacing={2}>
            <SwitchWrap
              label="נטרל תפריט עמודה"
              value={options.disableColumnMenu as boolean}
              onChangeHandler={(e) =>
                setOptions((prev) => ({ ...prev, disableColumnMenu: e.target.checked }))
              }
            />
            <SwitchWrap
              label="נטרל בורר עמודות"
              value={options.disableColumnSelector as boolean}
              onChangeHandler={(e) =>
                setOptions((prev) => ({ ...prev, disableColumnSelector: e.target.checked }))
              }
            />
            <SwitchWrap
              label="נטרל צפיפות"
              value={options.disableDensitySelector as boolean}
              onChangeHandler={(e) =>
                setOptions((prev) => ({ ...prev, disableDensitySelector: e.target.checked }))
              }
            />
          </Stack>

          <Divider textAlign="right">עמודות</Divider>
          <Stack spacing={2}>
            <Stack direction="row" gap={1} spacing={2} flexWrap="wrap">

          
              <InputWrap
                label="כמות שורות"
                type="number"
                value={options.rowCount as number}
                onChangeHandler={(e) =>
                  setOptions((prev) => ({ ...prev, rowCount: Number(e.target.value) }))
                }
              />
            </Stack>

            <SwitchWrap
              label="גודל עמוד אוטומטי"
              value={options.autoPageSize as boolean}
              onChangeHandler={(e) =>
                setOptions((prev) => ({ ...prev, autoPageSize: e.target.checked }))
              }
            />
          </Stack>
        </Stack>
      </Box>
    </AdminLayout>
  );
};

export default DataGridOptionsForm;
