import { Button, ButtonProps } from '@mui/material';


type CloseCallButtonProps = {
  callId: string;
  onClosed?: () => void;
  btnProps?: ButtonProps

};

const CloseCallButton: React.FC<CloseCallButtonProps> = ({ callId, onClosed , btnProps }) => {
  const handleClose = async () => {
    const confirm = window.confirm('Are you sure you want to move this call to CLOSED?');
    if (!confirm) return;

    try {
      const res = await fetch('/api/service_calls/close', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: callId }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Failed to close the service call');
        return;
      }

      alert('Service call moved to CLOSED');
      onClosed?.(); // refresh callback
    } catch (error) {
      console.error('Close call error:', error);
      alert('Error closing the service call');
    }
  };

  return (
    <Button
      variant="contained"
      color="warning"
      onClick={handleClose}
      size='small'
      {...btnProps}
    >
      סגור
    </Button>
  );
};

export default CloseCallButton;
