import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';

import Title from '../Title';
import IconButton from '@mui/material/IconButton';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 800,
  bgcolor: 'background.paper',
  boxShadow: 1,
  borderRadius: '10px',
  p: '50px',
};

interface ModalProps {
  isActive: boolean,
  title: string,
  handleClose: () => void
}

const CustomModal: React.FC<ModalProps> = ({ isActive, children, title, handleClose }) => {

  return (
    <Modal
      open={isActive}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isActive}>
        <Box sx={style}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={4}
          >
            <Title color='#535E6C'>{title}</Title>
            <IconButton sx={{
              marginRight: '-25px',
              marginTop: '-25px'
            }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          {children}
        </Box>
      </Fade>
    </Modal >
  );
}

export default CustomModal