import React, { useMemo } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';

import Title from '../Title';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/system';

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 800,
  bgcolor: 'background.paper',
  boxShadow: 1,
  borderRadius: '30px',
  p: '50px'
};

interface ModalProps {
  isActive: boolean;
  title: string;
  handleClose: () => void;
  style?: {}
}


const CustomBox = styled(Box)({
  '&::-webkit-scrollbar': {
    width: '10px'
  }
})

const CustomModal: React.FC<ModalProps> = ({
  isActive,
  children,
  title,
  handleClose,
  style = {}
}) => {
  return (
    <Modal
      open={isActive}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={isActive}>
        <Box sx={{
          ...modalStyle,
          ...style
        }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={2}
          >
            <Title color="#535E6C">{title}</Title>
            <IconButton
              sx={{
                marginRight: '-25px',
                marginTop: '-25px'
              }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          <CustomBox sx={{
            maxHeight: '800px',
            overflow: 'auto',
          }}>
            {children}
          </CustomBox>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
