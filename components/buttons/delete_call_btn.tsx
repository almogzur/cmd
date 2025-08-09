import { Button, ButtonProps } from '@mui/material';
import { useSession } from 'next-auth/react';

type DeleteCallButtonProps =    {
  callId: string;
  onDeleted?: () => void; // optional callback to refresh data or navigate
  btnProps?: ButtonProps
};

const DeleteCallButton: React.FC<DeleteCallButtonProps> = ({ callId, onDeleted, btnProps }) => {

  const { status } = useSession();
  

  const handleDelete = async () => {
    if (status !== 'authenticated') return;

    const confirmed = window.confirm('Are you sure you want to delete this service call?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/service_calls/remove?id=${callId}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Failed to delete service call');
        return;
      }

      alert('Service call deleted successfully');
      onDeleted?.(); // trigger refresh or navigation if provided
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting service call');
    }
  };

  return (
    <Button
      variant="contained"
      size="small"
      color="error"
      onClick={handleDelete}
      {...btnProps}
      
    >
     מחק
    </Button>
  );
};

export default DeleteCallButton;
