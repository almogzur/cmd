'use client';

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { ServiceCalls } from '@prisma/client';
import DeleteCallButton from '@/components/buttons/delete_call_btn';
import { Box, Stack, Chip } from '@mui/material';
import { translatePriorityToHebrew, translateStatusToHebrew } from '@/lib/heb';
import ColorIndicator from '../color_indicator';

type Item = ServiceCalls;

type AccordionComponentProps = {
  userName?: string|null;
  items?: Item[];
  title?: string;
};

export default function UserAccordion({ items}: AccordionComponentProps) {
 
const bgColor = (status: string) => {
  switch (status) {
    case 'LOW':
      return '#b2f2bb'; // Light green

    case 'MEDIUM':
      return '#ffd6a5'; // Light orange

    case 'HIGH':
      return '#ffadad'; // Light red

    case 'CRITICAL':
      return '#ff8787'; // Slightly stronger light red

    default:
      return '#dbeafe'; // Light blue (fallback)
  }
};



 
  return (
    <div 
      style={{
        marginTop: '10px',
        marginBottom: '150px'
      }}
    >


      {items?.map((item) => (
        <Accordion 
        key={item.id}
        sx={{
          mt:1,
          boxShadow:`0px 2px 8px 0px ${bgColor(item.priority)}`
        }}
        
        >

          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${item.id}-content`}
            id={`panel-${item.id}-header`}
            sx={{p:1}}
      
          >
            <Stack direction="row"  alignItems="center" gap={1}>
              <Typography > מספר  {item.id.slice(0,7)} -  </Typography>
              <Typography
                 color="text.secondary"
                  sx={{ }}>
                {item.description} {translateStatusToHebrew(item.status)}
              </Typography>

              <ColorIndicator 
                color={bgColor(item.priority)}
                 key={item.id}
                 
                 
                 
                   />
            </Stack>

          </AccordionSummary>

          <AccordionDetails 
          sx={{ }}
          >
            <Stack spacing={1} direction='column'>
              <Typography><strong>תיאור:</strong> {item.description}</Typography>
              <Typography><strong>לקוח:</strong> {item.customerName}</Typography>
              <Typography><strong>מיקום:</strong> {item.location}</Typography>
              <Typography><strong>סטטוס:</strong> {item.status}</Typography>
              <Typography><strong>עדיפות:</strong>  { translatePriorityToHebrew(item.priority)}</Typography>
              <Typography><strong>תאריך יצירה:</strong> {new Date(item.createdAt).toLocaleString()}</Typography>
           
              {item.updatedAt && (
                <Typography><strong>עודכן בתאריך:</strong> {new Date(item.updatedAt).toLocaleString()}</Typography>
              )}
              {item.technicianNote && (
                <Typography><strong>הערת טכנאי:</strong> {item.technicianNote}</Typography>
              )}
              {item.attachments?.length > 0 && (
                <Box>
                  <Typography><strong>קבצים:</strong></Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {item.attachments.map((file, idx) => (
                      <Chip key={idx} label={file} variant="outlined" />
                    ))}
                  </Stack>
                </Box>
              )}
            </Stack>
          </AccordionDetails>

          <AccordionActions sx={{ gap: 1 }}>
            <Button size="small" variant="contained">
              ערוך
            </Button>
            <DeleteCallButton callId={item.id} />
            
          </AccordionActions>
        </Accordion>
      ))}
    </div >
  );
}
