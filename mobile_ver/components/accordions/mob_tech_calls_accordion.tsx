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
import { parseTechnicianNotes } from '@/runtime_types/main';
import { DotColor } from '@/lib/constants';
import AdminCallActionMenu from '@/components/menus/admin_call_action_menu';
import TechCallActionMenu from '@/components/menus/tech_call_action_menu';


type AccordionComponentProps = {

    calls: ServiceCalls[];

};


const MobTechCallsAccordion: React.FC<AccordionComponentProps> = ({ calls }) => {

    const { textColor, bgColor, isDarkMode } = useThemeContext();


return (
    <Stack>
        {calls?.map((item) => (
            <Accordion
                key={item.id}
                disableGutters
                elevation={0}
                sx={{
                    borderRadius: 4,
                    backgroundColor: bgColor,
                    boxShadow: `0px 1px 4px ${DotColor(item.priority)}${isDarkMode ? 15 : 96}`,
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: textColor }} />}
                    aria-controls={`panel-${item.id}-content`}
                    id={`panel-${item.id}-header`}
                    sx={{
                        minHeight: 36,
                        px: 2,
                        py: 1,
                        '& .MuiAccordionSummary-content': { marginY: 0.5 },
                        '&.Mui-expanded': {
                            bgcolor: DotColor(item.priority),
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
                        <ColorIndicator color={DotColor(item.priority)} />

                        <Typography fontSize="0.95rem" fontWeight={500}>
                            {item.customerName} - {item.description} {translateStatusToHebrew(item.status)}
                        </Typography>

                    </Stack>
                </AccordionSummary>

                <AccordionDetails sx={{ px: 2.5, py: 1.5 }}>

                    <TechCallActionMenu
                        btnProps={{
                            sx: { position: 'absolute', top: '50px', left: '0px', color: textColor },
                        }}
                        menuProps={{
                            slotProps: {
                                paper: { sx: { backgroundColor: bgColor } },

                            },
                        }}
                        callId={item.id}
                    />

                    <Stack
                        spacing={0.5}
                        sx={{ '& .MuiTypography-root': { color: textColor } }}
                    >
                        <Typography fontSize="0.9rem"><strong>תיאור:</strong> {item.description}</Typography>
                        <Typography fontSize="0.9rem"><strong>לקוח:</strong> {item.customerName}</Typography>
                        <Typography fontSize="0.9rem"><strong>מיקום:</strong> {item.location}</Typography>
                        <Typography fontSize="0.9rem"><strong>סטטוס:</strong> {translateStatusToHebrew(item.status)}</Typography>
                        <Typography fontSize="0.9rem"><strong>עדיפות:</strong> {translatePriorityToHebrew(item.priority)}</Typography>
                        <Typography fontSize="0.9rem"><strong>תאריך יצירה:</strong> {new Date(item.createdAt).toLocaleString()}</Typography>

                        <Typography>הערות טכנאי : </Typography>
                        {parseTechnicianNotes(item.technicianNotes).length && (
                            <>
                                {parseTechnicianNotes(item.technicianNotes).map((note) => (
                                    <Typography key={note.id}>
                                        תאריך: {new Date(note.createdAt).toLocaleDateString()} -
                                        {note.text} -
                                        {note.authorName}
                                    </Typography>

                                ))}
                            </>
                        )
                        }


                        {item.updatedAt && (
                            <Typography fontSize="0.9rem">
                                <strong>עודכן בתאריך:</strong> {new Date(item.updatedAt).toLocaleString()}
                            </Typography>
                        )}

                        {/* Technician block (shows only what exists) */}
                        {(item.technicianName || item.technicianEmail || item.technicianId
                        ) && (
                                <Box mt={0.5}>

                                    {item.technicianName && (
                                        <Typography fontSize="0.9rem"><strong>שם מטפל:</strong> {item.technicianName}</Typography>
                                    )}
                                    {item.technicianEmail && (
                                        <Typography fontSize="0.9rem"><strong>אימייל מטפל:</strong> {item.technicianEmail}</Typography>
                                    )}


                                </Box>
                            )}

                        {/* Creator / user and asset info */}

                        {item.assetSn && (
                            <Typography fontSize="0.9rem"><strong>מס׳ סידורי נכס:</strong> {item.assetSn}</Typography>
                        )}

                        {item.attachments?.length > 0 && (
                            <Box>
                                <Typography fontSize="0.9rem"><strong>קבצים:</strong></Typography>
                                <Stack direction="row" spacing={1} flexWrap="wrap" mt={0.5}>
                                    {item.attachments.map((file, idx) => (
                                        <Chip key={idx} label={file} variant="outlined" size="small" />
                                    ))}
                                </Stack>
                            </Box>
                        )}

                    </Stack>

                </AccordionDetails>

            </Accordion>
        ))}
    </Stack>
)
}




export default MobTechCallsAccordion
