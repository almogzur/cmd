'use client';

import * as React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Chip,
  Stack,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ServiceCalls } from '@prisma/client';
import { translatePriorityToHebrew, translateStatusToHebrew } from '@/lib/heb';
import ColorIndicator from '@/components/color_indicator';
import { useThemeContext } from '@/context/theme_context';
import CallActionMenu from '@/components/menus/admin_call_action_menu';
import { parseTechnicianNotes } from '@/runtime_types/main';
import { DotColor } from '@/lib/constants';
import { useSession } from 'next-auth/react';




type AccordionComponentProps = {

  calls?: ServiceCalls[];

};



// Clean extractor: Prisma.JsonValue -> TechnicianNote[]


const  MobileAdminAccordion : React.FC<AccordionComponentProps> = ({ calls })=> {
  const { textColor, bgColor, isDarkMode } = useThemeContext();
const {  data: session } = useSession()

if(!session) return null

  return (
    <Stack
    pb={7} >
      {calls?.map((call) => (

        <Accordion
          key={call.id}
          disableGutters
          elevation={0}
          sx={{
            borderRadius: 4,
            backgroundColor: bgColor,
            boxShadow: `0px 1px 4px ${DotColor(call.priority)}${isDarkMode ? 15 : 96}`,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: textColor }} />}
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
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              gap={1}
              alignItems="center"
              sx={{ '& .MuiTypography-root': { color: textColor } }}
            >
              <ColorIndicator color={DotColor(call.priority)} />

              <Typography fontSize="0.95rem" fontWeight={500}>
                {call.customerName} - {call.description} {translateStatusToHebrew(call.status)}
              </Typography>
          
            </Stack>
          </AccordionSummary>

          <AccordionDetails sx={{ px: 2.5, py: 1.5 }}>

              
            <CallActionMenu
              btnProps={{
                sx: { position: 'absolute', top: '50px', left: '0px', color: textColor },
              }}
              menuProps={{
                slotProps: { 
                  paper: { sx: { backgroundColor: bgColor } } ,
                  
                },
              }}
              callId={call.id}
              callStatus={call.status}
            />

            <Stack
              spacing={0.5}
              sx={{ '& .MuiTypography-root': { color: textColor } }}
            >
              <Typography fontSize="0.9rem"><strong>תיאור:</strong> {call.description}</Typography>
              <Typography fontSize="0.9rem"><strong>לקוח:</strong> {call.customerName}</Typography>
              <Typography fontSize="0.9rem"><strong>מיקום:</strong> {call.location}</Typography>
              <Typography fontSize="0.9rem"><strong>סטטוס:</strong> {translateStatusToHebrew(call.status)}</Typography>
              <Typography fontSize="0.9rem"><strong>עדיפות:</strong> {translatePriorityToHebrew(call.priority)}</Typography>
              <Typography fontSize="0.9rem"><strong>תאריך יצירה:</strong> {new Date(call.createdAt).toLocaleString()}</Typography>


              <Typography>הערות טכנאי : </Typography>
              {parseTechnicianNotes(call.technicianNotes).length && (
                <>
                  {parseTechnicianNotes(call.technicianNotes).map((note) => (
                    <Typography key={note.id}>
                      תאריך: {new Date(note.createdAt).toLocaleDateString()} -
                      {note.text} - 
                      {note.authorName} 
                    </Typography>
        
                  ))}
                </>
              )
              }


              {call.updatedAt && (
                <Typography fontSize="0.9rem">
                  <strong>עודכן בתאריך:</strong> {new Date(call.updatedAt).toLocaleString()}
                </Typography>
              )}

              {/* Technician block (shows only what exists) */}
              {(call.technicianName || call.technicianEmail || call.technicianId
              ) && (
                  <Box mt={0.5}>
             
                    {call.technicianName && (
                      <Typography fontSize="0.9rem"><strong>שם מטפל:</strong> {call.technicianName}</Typography>
                    )}
                    {call.technicianEmail && (
                      <Typography fontSize="0.9rem"><strong>אימייל מטפל:</strong> {call.technicianEmail}</Typography>
                    )}


                  </Box>
                )}

              {/* Creator / user and asset info */}

              {call.assetSn && (
                <Typography fontSize="0.9rem"><strong>מס׳ סידורי נכס:</strong> {call.assetSn}</Typography>
              )}

              {call.attachments?.length > 0 && (
                <Box>
                  <Typography fontSize="0.9rem"><strong>קבצים:</strong></Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" mt={0.5}>
                    {call.attachments.map((file, idx) => (
                      <Chip key={idx} label={file} variant="outlined" size="small" />
                    ))}
                  </Stack>
                </Box>
              )}

              {call.closerId && (
                <Typography fontSize="0.9rem"><strong>נסגר על ידי:</strong> {call.closerName}</Typography>
              )}

              {call.reopenedBy  && (
                <Typography fontSize="0.9rem"><strong>שוחזר על ידי:</strong> {call.reopenedBy}</Typography>
              )}

            </Stack>

          </AccordionDetails>

        </Accordion>
      ))}
    </Stack>
  );
}

export default MobileAdminAccordion;
