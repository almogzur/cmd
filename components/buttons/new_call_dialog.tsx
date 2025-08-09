'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import { ButtonProps, DialogProps } from '@mui/material';
import InputWrap from '@/components/inputs/input-wrap';
import { useSession } from 'next-auth/react';
import { useUserServiceCalls } from '@/hooks/use_user_service_calls';
import SelectWrap from '@/components/inputs/select-wrap';
import Typography from '@mui/material/Typography';
import { v4 as uuidv4 } from 'uuid';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// Generate a UID (e.g., 'call-abc123xyz')

const generateUID = () => uuidv4()

type NewCallDialogProps = {
  btnProps?: ButtonProps
  dialogProps?: DialogProps
};

export default function NewCallDialog({ btnProps, dialogProps }: NewCallDialogProps) {

  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [uid, setUid] = useState<string | null>(null);

  const { mutate }=  useUserServiceCalls(session?.user?.id)

  const [callState, setCallState] = useState({
    name: '',
    phone: '',
    location: '',
    description: '',
    priority: '',
    note: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
    setCurrentStep(0);
    setUid(null);
  };

  const handleClose = () => {
    setOpen(false);
    setCallState({
      name: '',
      phone: '',
      location: '',
      description: '',
      priority: '',
      note: '',
    });
      mutate() // make new call to api to update list 
  };

  const nextStep = () => {
    const next = currentStep + 1;
    if (next === 6) {
      setUid(generateUID());
    }
    setCurrentStep(next);
  };

  const slideIn = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.user?.id) {
      console.error('No user ID found in session');
      return;
    }

    const uid = generateUID() // optional if you want UID inside title

    const callPayload = {
      id: uid,
      description: callState.description,
      customerName: session.user.name ?? callState.name,
      location: callState.location,
      priority: callState.priority.toUpperCase(), // must match Prisma enum
      attachments: [], // or attach real files if implemented
      userId: session.user.id,
    };

    try {
      const res = await fetch('/api/service_calls/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(callPayload),
      });

      if (!res.ok) {
        const err = await res.json();
        alert('API Error:'+ err);
        return;
      }

      const data = await res.json();
      console.log('Call Created:', data);
      handleClose();
    } catch (error) {
      console.error('Submission Error:', error);
    }
  };

  return (
    <>
    {btnProps?.title ?  
     <Button
        sx={{
          color: '#fff',
        }}
        variant="contained"
        onClick={handleClickOpen}
   
        {...btnProps}
      >
        {btnProps?.title}
      </Button> 
      :
      <AddCircleOutlineIcon
       
       sx={{color:'#33bb4c', scale: 1.5}}
       
       onClick={handleClickOpen}
        />

      }
   

      <Dialog
        open={open}
        onClose={handleClose}
        dir="rtl"
        maxWidth="md"
        fullWidth
        {...dialogProps}
      >
        <DialogTitle textAlign="right">פתיחת קריאת שירות</DialogTitle>

        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ direction: 'ltr' }}>

            {/* Step 0: Name */}

            {currentStep === 0 && (
              <motion.div variants={slideIn} initial="hidden" animate="visible" transition={{ duration: 0.4 }}>
                <InputWrap
                  label="שם הלקוח"
                  value={session?.user?.name ?? callState.name}
                  onChangeHandler={(e) =>
                    setCallState({ ...callState, name: e.target.value })
                  }
                  required
                  variant="standard"
                  fullWidth
                  margin="dense"
                  disabled={!!session?.user?.name}
                />
                {!session?.user?.name && callState.name.trim() && (
                  <Button onClick={nextStep} sx={{ mt: 2 }}>הבא</Button>
                )}
                {!!session?.user?.name && <Button onClick={nextStep} sx={{ mt: 2 }}>הבא</Button>}
              </motion.div>
            )}

            {/* Step 1: Description as button options */}
            {currentStep === 1 && (
              <motion.div variants={slideIn} initial="hidden" animate="visible" transition={{ duration: 0.4 }}>
                <Typography sx={{ mb: 1, textAlign: 'right' }}>בחר תיאור תקלה:</Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {[
                    'לא מדפיס',
                    'אין תקשורת',
                    'תקלה במצלמה',
                    'מחשב לא נדלק',
                  ].map((option) => (
                    <Button
                      key={option}
                      variant={callState.description === option ? 'contained' : 'outlined'}
                      onClick={() => setCallState({ ...callState, description: option })}
                      sx={{ justifyContent: 'flex-end' }}
                    >
                      {option}
                    </Button>
                  ))}
                </Box>

                {callState.description && (
                  <Button onClick={nextStep} sx={{ mt: 3 }}>
                    הבא
                  </Button>
                )}
              </motion.div>

            )}

            {/* Step 2: Phone */}

            {currentStep === 2 && (
              <motion.div variants={slideIn} initial="hidden" animate="visible" transition={{ duration: 0.4 }}>
                <InputWrap
                  label="טלפון ליצירת קשר"
                  value={callState.phone}
                  onChangeHandler={(e) =>
                    setCallState({ ...callState, phone: e.target.value })
                  }
                  required
                  variant="standard"
                  fullWidth
                  margin="dense"
                  type="tel"
                />
                {callState.phone.trim().length >= 7 && (
                  <Button onClick={nextStep} sx={{ mt: 2 }}>הבא</Button>
                )}
              </motion.div>
            )}

            {/* Step 3: Location */}

            {currentStep === 3 && (
              <motion.div variants={slideIn} initial="hidden" animate="visible" transition={{ duration: 0.4 }}>
                <InputWrap
                  label="מיקום"
                  value={callState.location}
                  onChangeHandler={(e) =>
                    setCallState({ ...callState, location: e.target.value })
                  }
                  required
                  variant="standard"
                  fullWidth
                  margin="dense"
                />
                {callState.location.trim() && (
                  <Button onClick={nextStep} sx={{ mt: 2 }}>הבא</Button>
                )}
              </motion.div>
            )}

            {/* Step 4: Priority */}

            {currentStep === 4 && (
              <motion.div
                variants={slideIn}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.4 }}
                dir='rtl'
             >

                <SelectWrap
                  selectSxProps={{
                    width: '100%',
                  }}
                  labelSxProps={{
                    width:'100%',
                    mx:-3,
                    transition: "none",
                    
                    textAlign:"start",
        
                    '&.Mui-focused': {
                      color: 'red',
                      transform: 'none',
                    }

                  }}
                  



                  label="עדיפות"
                
                  items={[
                    { value: 'low', label: 'נמוכה' },
                    { value: 'medium', label: 'בינונית' },
                    { value: 'high', label: 'גבוהה' },
                    { value: 'critical', label: 'קריטית' },
                  ]}
                  value={callState.priority}
                  changeHandler={(e) =>
                    setCallState({ ...callState, priority: e.target.value })
                  }
                  helpText=""
                  variant="standard"
                />
                {callState.priority && (
                  <Button onClick={nextStep} sx={{ mt: 2 }}>הבא</Button>
                )}
              </motion.div>
            )}

            {/* Step 5: Notes */}

            {currentStep === 5 && (
              <motion.div variants={slideIn} initial="hidden" animate="visible" transition={{ duration: 0.4 }}>
                <InputWrap
                  label="הערות"
                  value={callState.note}
                  onChangeHandler={(e) =>
                    setCallState({ ...callState, note: e.target.value })
                  }
                  multiline
                  rows={2}
                  variant="standard"
                  fullWidth
                  margin="dense"
                />
                <Button onClick={nextStep} sx={{ mt: 2 }}>הבא</Button>
              </motion.div>
            )}

            {/* Step 6: Final Summary + UID */}

            {currentStep === 6 && (
              <motion.div variants={slideIn} initial="hidden" animate="visible" transition={{ duration: 0.4 }}>
                <Box sx={{ direction: 'rtl' }}>
                  <Typography variant="h6" gutterBottom>סיכום הקריאה:</Typography>
                  <Typography><strong>מזהה קריאה:</strong> {uid}</Typography>
                  <Typography><strong>שם:</strong> {session?.user?.name ?? callState.name}</Typography>
                  <Typography><strong>מייל:</strong> {session?.user?.email ?? '-'}</Typography>
                  <Typography><strong>טלפון:</strong> {callState.phone || '-'}</Typography>
                  <Typography><strong>מיקום:</strong> {callState.location || '-'}</Typography>
                  <Typography><strong>תיאור:</strong> {callState.description || '-'}</Typography>
                  <Typography><strong>עדיפות:</strong> {callState.priority || '-'}</Typography>
                  <Typography><strong>הערות:</strong> {callState.note || '-'}</Typography>
                </Box>

                <DialogActions sx={{ justifyContent: 'space-between', mt: 2 }}>
                  <Button onClick={handleClose}>ביטול</Button>
                  <Button type="submit" variant="contained">שלח</Button>
                </DialogActions>
              </motion.div>
            )}

          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
