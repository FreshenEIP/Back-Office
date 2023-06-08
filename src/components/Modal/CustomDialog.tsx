import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { ReactNode, useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import { useQueryClient } from 'react-query';

interface Props {
  header: JSX.Element | ReactNode;
  children: ReactNode;
  trigger: JSX.Element | ReactNode;
}

export const CustomDialog: React.FC<Props> = ({
  header,
  children,
  trigger,
}) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    queryClient.refetchQueries({ active: true });
  };

  return (
    <>
      <div onClick={handleOpen}>{trigger}</div>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>
          {header}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <RiCloseFill />
          </IconButton>
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </>
  );
};
