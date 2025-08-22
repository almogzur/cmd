'use client';

import * as React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import SelectWrap from "../inputs/select-wrap";
import InputWrap from "../inputs/input-wrap";
import { useRef, useState } from "react";
import { useServiceCallById } from "@/hooks/use_service_call_By_Id";
import { useThemeContext } from "@/context/theme_context";
import { SelectChangeEvent } from "@mui/material/Select";
import { ServiceCallStatus } from "@prisma/client";
import { parseTechnicianNotes } from "@/runtime_types/main";

type Props = {
  callId: string;
  technicianId: string;
  btnProps?: ButtonProps;
  parentState?: {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  };
};

export type FormState = {
  location: string;
  status: ServiceCallStatus;
  attachments: string[];
  note: string; // "new note" input
};

// Zod array schema for notes

// Clean extractor: Prisma.JsonValue -> TechnicianNote[]


const AdminEditCallButton: React.FC<Props> = ({ callId, technicianId: _technicianId, btnProps }) => {

  const [open, setOpen] = useState(false);
  const { serviceCall, isLoading, isError } = useServiceCallById(callId);
  const { bgColor, textColor } = useThemeContext();

  const [form, setForm] = useState<FormState>({
    location: serviceCall?.location ?? "",
    status: serviceCall?.status ?? 'NEW',
    attachments: serviceCall?.attachments || [],
    note: "",
  });



  const handleClose = () => setOpen(false);
  const handleClick = () => setOpen(true);

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

  // Attachments helpers
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const attachmentsText = () => (form.attachments.length ? form.attachments.join("\n") : "")
  const handlePickFiles = () => fileInputRef.current?.click();
  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    const newItems = files.map((f) => f.name); // replace with uploaded URLs when ready
    setForm((f) => ({ ...f, attachments: [...f.attachments, ...newItems] }));
    e.target.value = "";
  };
  const removeAttachment = (idx: number) => {
    setForm((f) => ({ ...f, attachments: f.attachments.filter((_, i) => i !== idx) }))
  }

  const fmt = (d?: Date | string | null) => (d ? new Date(d).toLocaleString() : "");

  // Safely extract and sort notes (newest first)

  const notes = parseTechnicianNotes(serviceCall?.technicianNotes);


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!serviceCall) return <div>Service call not found</div>;

  return (
    <>
      <Button variant="contained" size="small" {...btnProps} onClick={handleClick}>
        עדכן
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
              <Stack direction="row" gap={2}>
                <InputWrap label="נוצר בתאריך" value={fmt(serviceCall.createdAt)} variant="filled" />
                <InputWrap label="עודכן בתאריך" value={fmt(serviceCall.updatedAt)} variant="filled" />
              </Stack>
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

              {/* editable status */}
              <SelectWrap
                variant="filled"
                label="סטטוס"
                value={form.status}
                items={[
                  { value: ServiceCallStatus.NEW, label: "חדש" },
                  { value: ServiceCallStatus.IN_PROGRESS, label: "בתהליך" },
                  { value: ServiceCallStatus.PENDING, label: "ממתינה" },
                ]}
                changeHandler={(e: SelectChangeEvent<string>) =>
                  setForm((f) => ({ ...f, status: e.target.value as ServiceCallStatus }))
                }
              />

              {/* notes list + add */}
              <Stack gap={1}>
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
              </Stack>

              {/* attachments + add files */}
              <Stack gap={1}>
                <InputWrap
                        variant="filled"
                  label="קבצים מצורפים (שורה לכל פריט)"
                  value={attachmentsText()}
                  onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setForm((f) => ({
                      ...f,
                      attachments: e.target.value
                        .split("\n")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    }))
                  }
                  multiline
                  minRows={3}
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
            </Stack>
          </DialogContent>

          <DialogActions sx={{ gap: 1 }}>
            <Button onClick={handleClose}>בטל</Button>
            <Button type="submit" variant="contained">
              שמור
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AdminEditCallButton;
