import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Stack from "@mui/material/Stack"
import InputWrap from "../inputs/input-wrap"
import { useThemeContext } from "@/context/theme_context"
import { useRef, useState } from "react"
import { useServiceCallById } from "@/hooks/use_service_call_By_Id"
import { ServiceCallStatus } from "@prisma/client"
import Box from "@mui/material/Box"
import { Chip, DialogActions } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";



type Props = {
    callId: string
}

export type FormState = {
    location: string;
    status: ServiceCallStatus;
    attachments: string[];
    note: string; // "new note" input
};

const UserEditCallBtn: React.FC<Props> = ({ callId }) => {

    const { bgColor, textColor } = useThemeContext();
    const [open, setOpen] = useState(false);
    const { serviceCall, isLoading, isError } = useServiceCallById(callId);



    const [form, setForm] = useState<FormState>({
        location: serviceCall?.location ?? "",
        status: serviceCall?.status ?? 'NEW',
        attachments: serviceCall?.attachments || [],
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
            id: callId,
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

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;
    if (!serviceCall) return <div>Service call not found</div>;

    return (
        <>
            <Button
                onClick={handleClick}
                variant="contained"
            >עדכן
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="md"
                sx={{
                    "& .MuiTypography-root": { color: textColor },
                    "& .MuiInputBase-root": { color: textColor },
                }}
                slotProps={{ paper: { style: { backgroundColor: bgColor } } }}
            >
                <DialogTitle variant="h6" dir="rtl">עריכת קריאה — {serviceCall.id.slice(0, 10)}</DialogTitle>

                <form onSubmit={handleSubmit}>
                    <DialogContent dividers dir="rtl">
                        <Stack spacing={2}>
                            {/* read-only meta */}

                            <InputWrap label="שם לקוח" value={serviceCall.customerName ?? ""} variant="filled" />
                            <InputWrap label="תיאור" value={serviceCall.description ?? ""} multiline minRows={2} variant="filled" />

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


        </Dialog >

        </>
    )
}

export default UserEditCallBtn