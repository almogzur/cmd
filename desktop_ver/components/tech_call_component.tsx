import { useTechnicianServiceCalls } from "@/hooks/use_technician_service_calls"
import { parseTechnicianNotes } from "@/runtime_types/main"
import Stack from "@mui/material/Stack"
import {  ServiceCallStatus } from "@prisma/client"
import { useSession } from "next-auth/react"
import {  useEffect, useRef, useState } from "react"
import Box from "@mui/material/Box"
import { useThemeContext } from "@/context/theme_context"
import { useDesktopSelectedCall } from "@/context/desktop_admin_selected_call"
import { FormState } from "@/components/buttons/admin_edit_call"
import TechniciansDropMenu from "@/components/buttons/assign_technician/tech_dropdown_menu"
import CloseCallButton from "@/components/buttons/close_call_btn"
import InputWrap from "@/components/inputs/input-wrap"
import SelectWrap from "@/components/inputs/select-wrap"
import CallsFilterOptionsMenu from "@/components/menus/calls_filter_options_menu"
import { Typography, List, Button, Chip } from "@mui/material"
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import { Settings } from "@mui/icons-material";

import { CallItemSummary } from "./admin_calls_component"
import DesktopCallsDrawer from "./desktop_calls_drawer"


const DesktopTechCalllsComponent: React.FC = () => {

    const { data: session } = useSession()

    const { serviceCalls, isError, isLoading, mutate } = useTechnicianServiceCalls(session?.user.id)
    const { textColor, bgColor } = useThemeContext()

    const { call, setCall } = useDesktopSelectedCall()

    const [form, setForm] = useState<FormState>({
        location: call?.location ?? "",
        status: call?.status ?? 'NEW',
        attachments: call?.attachments || [],
        note: "",
    });

    useEffect(() => {
        if (call) {
            setForm({
                location: call.location ?? "",
                status: call.status,
                attachments: call.attachments || [],
                note: "",
            });
        }
    }, [call]);

    // calls filters 

    const onlyNewCalls = serviceCalls?.filter(call => call.status === 'NEW')
    const onlyInProgressCalls = serviceCalls?.filter(call => call.status === 'IN_PROGRESS')
    const onlyClosedCalls = serviceCalls?.filter(call => call.status === 'DONE')




    // Form
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const notes = parseTechnicianNotes(call?.technicianNotes);

    const fmt = (d?: Date | string | null) => (d ? new Date(d).toLocaleString() : "");

    const handlePickFiles = () => fileInputRef.current?.click();

    const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        if (!files.length) return;
        const newItems = files.map((f) => f.name); // replace with uploaded URLs when ready
        setForm((f) => ({ ...f, attachments: [...f.attachments, ...newItems] }));
        e.target.value = "";
    };

    const attachmentsText = () => {
        return form.attachments.length ? form.attachments.join("\n") : ""
    }

    const removeAttachment = (idx: number) => {
        setForm((f) => ({ ...f, attachments: f.attachments.filter((_, i) => i !== idx) }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
        e.preventDefault();

        const payload: {
            id: string;
            location: string;
            status: ServiceCallStatus;
            attachments: string[];
            newNote?: string;
        } = {
            id: call?.id ?? "",
            location: form.location,
            status: form.status,
            attachments: form.attachments,
        };

        if (form.note.trim()) payload.newNote = form.note.trim();

        const res = await fetch("/api/service_calls/update", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            setForm((f) => ({ ...f, note: "" }));
            setCall(null)
            mutate()

        } else {
            console.error("Failed to update service call");
        }
    };

    if (isLoading || !serviceCalls) return <div>Loading...</div>
    if (isError) return <div>Error</div>

    return (
        <Stack direction={'row'} >

            <DesktopCallsDrawer>

                <Box display={'flex'} position={"sticky"} top={0} bgcolor={bgColor} zIndex={100}>

                    <Typography
                        variant="h6"
                        sx={{ color: textColor }}
                        p={1.5}
                    >
                        {session?.user.name} -
                        {'קריאות שירות'}

                    </Typography>

                    <CallsFilterOptionsMenu
                        Icon={<Settings />}
                    />
                </Box>

                <List>
                    {serviceCalls.map((call, i) => (
                        <CallItemSummary key={call.id} serviceCall={call} index={i} />
                    ))}
                </List>

            </DesktopCallsDrawer>

            {call &&
                <Box
                    mt={3}
                    p={2}
                    maxHeight={'80vh'}
                    overflow={'scroll'}
                    sx={{
                        overflowX: 'hidden',
                        scrollbarWidth: 'none',
                        "& .MuiTypography-root": { color: textColor },
                        "& .MuiInputBase-root": { color: textColor },
                    }}
                    flex={1}
                >
                    <form onSubmit={(e) => handleSubmit(e, call.id)}>

                        <Stack spacing={2}  >
                            {/* read-only meta */}
                            <Stack direction="row" gap={2}>
                                <InputWrap
                                    variant="filled"
                                    label="נוצר בתאריך"
                                    value={fmt(call.createdAt)}
                                    sxProps={{ flexGrow: 1 }}

                                />
                                <InputWrap
                                    label="עודכן בתאריך"
                                    value={fmt(call.updatedAt)}
                                    sxProps={{ flexGrow: 1 }}
                                    variant="filled"
                                />
                            </Stack>

                            <InputWrap label="שם לקוח" value={call.customerName ?? ""} variant="filled" />
                            <InputWrap label="תיאור" value={call.description ?? ""} variant="filled" />

                            {/* editable location */}
                            <InputWrap
                                variant="filled"
                                label="מיקום"
                                value={form.location}
                                onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setForm((f) => ({ ...f, location: e.target.value }))
                                }
                                disabled={call.status === ServiceCallStatus.DONE}
                            />

                            {/* editable status */}
                            <SelectWrap
                                label="סטטוס"
                                items={[
                                    { value: ServiceCallStatus.NEW, label: "חדש" },
                                    { value: ServiceCallStatus.IN_PROGRESS, label: "בתהליך" },
                                    { value: ServiceCallStatus.PENDING, label: "ממתינה" },
                                ]}
                                selectProps={{
                                    onChange: (e) => setForm((f) => ({ ...f, status: e.target.value as ServiceCallStatus })),
                                    variant: "filled",
                                    value: form.status
                                }} 
                                
                            />

                            {/* notes list + add */}
                            <Stack gap={1}>
                                <Typography variant="subtitle1"> מטופל  ע״י : {call.technicianName ? call.technicianName : 'אין'}</Typography>
                                <Typography variant="subtitle1">הערות טכנאים</Typography>

                                {notes.length ? (
                                    <Stack gap={1}>
                                        {notes.map((n) => (
                                            <Box key={n.id} sx={{ p: 1.2, borderRadius: 2, border: "1px solid", borderColor: textColor }}>
                                                <Stack direction="row" gap={1} alignItems="baseline">

                                                    <Typography fontWeight={600}>{n.authorName}</Typography>

                                                    <Typography variant="caption">{fmt(n.createdAt)}</Typography>
                                                </Stack>
                                                <Typography sx={{ whiteSpace: "pre-wrap" }}>{n.text}</Typography>
                                            </Box>
                                        ))}
                                    </Stack>
                                ) : (
                                    <Typography variant="body2" color="text.secondary">
                                        אין הערות
                                    </Typography>
                                )}

                                {call.status !== 'DONE' &&
                                    <InputWrap
                                        variant="filled"
                                        label="הוסף הערת טכנאי"
                                        value={form.note}
                                        onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setForm((f) => ({ ...f, note: e.target.value }))
                                        }
                                        multiline
                                        minRows={2}

                                    />
                                }

                            </Stack>


                            {/* attachments + add files */}

                            <Stack gap={1}>
                                {call.status !== 'DONE' &&
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*,application/pdf"
                                            multiple
                                            hidden
                                            onChange={handleFilesSelected}
                                        />
                                        <Button size="small" variant="contained" startIcon={<UploadFileIcon />} onClick={handlePickFiles}>
                                            הוסף קבצים
                                        </Button>
                                    </Box>
                                }


                                <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
                                    {form.attachments.map((att, idx) => (
                                        <Chip
                                            key={`${att}-${idx}`}
                                            label={att}
                                            onDelete={() => removeAttachment(idx)}
                                            deleteIcon={<CloseIcon />}
                                            variant="outlined"
                                            size="small"
                                        />
                                    ))}
                                </Box>


                            </Stack>

                            {call.closerName && <InputWrap label='נסגר ע״י' value={call.closerName} variant="filled" />}

                            {/* actions */}
                            <Stack
                                direction={"row"}
                                flexWrap={'wrap'}

                                gap={2}
                                p={1}

                            >
                                {call.status !== 'DONE' &&
                                    <>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                        >
                                            עדכן
                                        </Button>


                                        <TechniciansDropMenu
                                            callId={call.id}
                                            btnText="שייך"

                                        />

                                        <CloseCallButton
                                            callId={call.id}
                                        />
                                    </>
                                }

                                {/* <DeleteCallButton
                                      callId={call.id}
                                    /> */
                                }





                            </Stack>



                        </Stack>

                    </form>

                </Box>
            }
        </Stack>
    )
}

export default DesktopTechCalllsComponent




