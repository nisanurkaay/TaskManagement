import React from 'react';
import { Modal as MuiModal, Box, Paper } from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<Props> = ({ open, onClose, children }) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" px={2}>
        <Paper className="modal-content">{children}</Paper>
      </Box>
    </MuiModal>
  );
};

export default Modal;