

import DesktopCallsDrawer from "./desktop_calls_drawer"
import { CallItemSummary } from "./admin_calls_component"
import CallsFilterOptionsMenu from "@/components/menus/calls_filter_options_menu"

import InputWrap from "@/components/inputs/input-wrap"

import { Settings } from "@mui/icons-material"
import { Stack, Box, Typography, List, Button, Chip, DialogActions, DialogContent } from "@mui/material"
import { ServiceCallStatus } from "@prisma/client"
import { useThemeContext } from "@/context/theme_context"

import { FormState } from "@/components/buttons/admin_edit_call"
import { useServiceCallById } from "@/hooks/use_service_call_By_Id"

import { useState, useRef } from "react"
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useDesktopSelectedCall } from "@/context/desktop_admin_selected_call"
import { useUserServiceCalls } from "@/hooks/use_user_service_calls"
import { useSession } from "next-auth/react"





const DesktopUserCallsComponent: React.FC = () => {

    const {data:session} = useSession()
    const { bgColor, textColor } = useThemeContext();
    const [open, setOpen] = useState(false);

    const { serviceCalls, isLoading , isError} = useUserServiceCalls(session?.user.id)
    const { call, setCall } = useDesktopSelectedCall()

  const [form, setForm] = useState<FormState>({
    location: call?.location ?? "",
    status: call?.status ?? 'NEW',
    attachments: call?.attachments || [],
    note: "",
  });

    const handleClose = () => setOpen(false);
    const handleClick = () => setOpen(true);


    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        if (!files.length) return;
        const newItems = files.map((f) => f.name); // replace with uploaded URLs when ready
        setForm((f) => ({ ...f, attachments: [...f.attachments, ...newItems] }));
        e.target.value = "";
    };
    const handlePickFiles = () => fileInputRef.current?.click();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

            handleClose();
        } else {
            console.error("Failed to update service call");
        }
    };
    const removeAttachment = (idx: number) => {
        setForm((f) => ({ ...f, attachments: f.attachments.filter((_, i) => i !== idx) }))
    }

  if (isLoading || !serviceCalls) return <div>Loading...</div>
  if (!session) return <div>Not logged in</div>

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
                     <form onSubmit={handleSubmit}>
                    <DialogContent dividers dir="rtl">
                        <Stack spacing={2}>
                            {/* read-only meta */}

                            <InputWrap label="שם לקוח" value={call.customerName ?? ""} variant="filled" />
                            <InputWrap label="תיאור" value={call.description ?? ""} multiline minRows={2} variant="filled" />

                            {/* editable location */}
                            <InputWrap
                                variant="filled"
                                label="מיקום"
                                value={form.location}
                                onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setForm((f) => ({ ...f, location: e.target.value }))
                                }
                            />




                            <Box display="flex" alignItems="center" gap={1}>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*,application/pdf"
                                    multiple
                                    hidden
                                    onChange={handleFilesSelected}
                                />
                                <Button size="small" variant="outlined" startIcon={<UploadFileIcon />} onClick={handlePickFiles}>
                                    הוסף קבצים
                                </Button>
                            </Box>

                            {form.attachments.length > 0 && (
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
                            )}
                        </Stack>

                </DialogContent>

                <DialogActions sx={{ gap: 1 }}>
                    <Button onClick={handleClose}>בטל</Button>
                    <Button type="submit" variant="contained">
                        שמור
                    </Button>
                </DialogActions>
                </form>


                </Box>
            }
        </Stack>
    )
}

export default DesktopUserCallsComponent