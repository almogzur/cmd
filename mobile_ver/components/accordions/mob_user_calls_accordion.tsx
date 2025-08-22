'use client';

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ServiceCalls } from '@prisma/client';

import { Box, Stack, Chip } from '@mui/material';
import { translatePriorityToHebrew, translateStatusToHebrew } from '@/lib/heb';
import ColorIndicator from '@/components/color_indicator';
import { DotColor } from '@/lib/constants';
import { useThemeContext } from '@/context/theme_context';

import CloseCallButton from '@/components/buttons/close_call_btn';
import EditCallButton from '@/components/buttons/admin_edit_call';
import UserEditCallBtn from '@/components/buttons/user_edit_call';




type AccordionComponentProps = {
  userName?: string | null;
  calls?: ServiceCalls[];
  title?: string;
};

const UserAccordion : React.FC<AccordionComponentProps> = ({ title, calls , userName }) => {
  


  const { textColor, bgColor, isDarkMode } = useThemeContext();



  return (
    <div
      style={{
        marginTop: '10px',
        marginBottom: '30px',
      }}
    >


      {calls?.map((call) => (
        <Accordion
          disableGutters
          key={call.id}
          sx={{
            mt: 1,
            borderRadius: 4,
            backgroundColor: bgColor,
            boxShadow: `0px 1px 4px ${DotColor(call.priority)}${isDarkMode ? 15 : 96}`
          }}

        >

          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${call.id}-content`}
            id={`panel-${call.id}-header`}
            sx={{
              minHeight: 36,
              px: 2,
              py: 1,
              '& .MuiAccordionSummary-content': { marginY: 0.5 },
              '&.Mui-expanded': {
                bgcolor: DotColor(call.priority),
                borderRadius: 3,
                opacity: 0.8,
              },
              '& .MuiTypography-root': {  color: textColor },
            }
            }

          >
            <Stack 
               direction="row"
                alignItems="center"
                 gap={1}
                 sx={{
                
                 }}
                 >
          
              <ColorIndicator
                color={DotColor(call.priority)}
                key={call.id}
              />
              <Typography >  {call.id.slice(0, 7)} -  </Typography>

              <Typography
                color="text.secondary"
                sx={{ '& .MuiTypography-root': { color: textColor } }}

              >
                {call.description} {translateStatusToHebrew(call.status)}
              </Typography>


            </Stack>

          </AccordionSummary>

          <AccordionDetails
            sx={{
                 '& .MuiTypography-root': { color: textColor },
            }}
          >
            <Stack spacing={1} direction='column'>
              <Typography><strong>תיאור:</strong> {call.description}</Typography>
              <Typography><strong>לקוח:</strong> {call.customerName}</Typography>
              <Typography><strong>מיקום:</strong> {call.location}</Typography>
              <Typography><strong>סטטוס:</strong> {call.status}</Typography>
              <Typography><strong>עדיפות:</strong>  {translatePriorityToHebrew(call.priority)}</Typography>
              <Typography><strong>תאריך יצירה:</strong> {new Date(call.createdAt).toLocaleString()}</Typography>

              {call.updatedAt && (
                <Typography><strong>עודכן בתאריך:</strong> {new Date(call.updatedAt).toLocaleString()}</Typography>
              )}
          
              {call.attachments?.length > 0 && (
                <Box>
                  <Typography><strong>קבצים:</strong></Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {call.attachments.map((file, idx) => (
                      <Chip key={idx} label={file} variant="outlined" />
                    ))}
                  </Stack>
                </Box>
              )}
            </Stack>
          </AccordionDetails>

          <AccordionActions sx={{ gap: 1 }}>

              { call.status !== 'DONE' &&
              <>
            <UserEditCallBtn callId={call.id } />  
            </>
              } 
          </AccordionActions>
          
        </Accordion>
      ))}
    </div >
  );
}


export default UserAccordion
