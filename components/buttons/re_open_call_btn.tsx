'use client';

import { useState } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { useSession } from 'next-auth/react';

type Props = {
  callId: string;
  btnProps?: ButtonProps
    parentState? :{
      value: boolean
      setValue: React.Dispatch<React.SetStateAction<HTMLElement|null>>
    }
};

export default function ReopenCallButton({ callId, btnProps}: Props) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleReopen = async () => {
    if (!session?.user?.id) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/service_calls/re_open', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: callId,
          reopenerId: session.user.id, // 👈 pass user ID
        }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Failed to reopen call');
      }

    } catch (err) {
            alert('Failed to reopen the service call' + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        size='small'
        color="success"
        onClick={handleReopen}
        disabled={loading}
        {...btnProps}
      >
        פתח  מחדש
      </Button>
      
    </>
  );
}
