import React from 'react';
import Button from '@mui/material/Button';

import { styled } from '@mui/system';

interface IButtonProps {
  title: string;
  secondary?: boolean;
  disabled?: boolean;
  cb: () => void;
}

const PrimaryButton = styled(Button)({
  fontFamily: 'Nunito',
  fontSize: '16px',
  height: '45px',
  textTransform: 'capitalize',
  boxShadow: 'none',
  backgroundColor: '#5893F9',
  '&:hover': {
    backgroundColor: '#74A7FF'
  }
});

const SecondaryButton = styled(Button)({
  fontFamily: 'Nunito',
  fontSize: '16px',
  fontWeight: '600',
  height: '45px',
  textTransform: 'capitalize',
  border: '1px solid #5893F9',
  color: '#5893F9',
  boxShadow: 'none',
  backgroundColor: '#FFFFFF',
  '&:hover': {
    backgroundColor: '#ECF2FC'
  }
});

const AddButton: React.FC<IButtonProps> = ({
  title,
  secondary,
  disabled,
  cb
}) => {
  if (secondary)
    return (
      <SecondaryButton variant="contained" disabled={disabled} onClick={cb}>
        {title}
      </SecondaryButton>
    );
  return (
    <PrimaryButton variant="contained" disabled={disabled} onClick={cb}>
      {title}
    </PrimaryButton>
  );
};

export default AddButton;
