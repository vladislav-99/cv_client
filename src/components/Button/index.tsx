import React from 'react';
import Button from '@mui/material/Button';

import { styled } from '@mui/system';

interface IButtonProps {
  title: string;
  secondary?: boolean;
  disabled?: boolean;
  type?: 'primary' | 'secondary' | 'ghost';
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

const SecondaryButton = styled(PrimaryButton)({
  backgroundColor: '#ECF2FC',
  color: '#5893F9',
  '&:hover': {
    backgroundColor: '#E7F0FF',
    boxShadow: 'none',
  },
  '&:active': {
    backgroundColor: '#DAE8FF'
  }
});

const GhostButton = styled(Button)({
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


const CustomButton: React.FC<IButtonProps> = ({
                                                title,
                                                type = 'primary',
                                                disabled,
                                                cb
                                              }) => {

  switch (type) {
    case 'primary': {
      return <PrimaryButton
        variant='contained'
        disabled={disabled}
        onClick={cb}
      >
        {title}
      </PrimaryButton>;
    }
    case 'secondary': {
      return <SecondaryButton
        variant='contained'
        disabled={disabled}
        onClick={cb}
      >
        {title}
      </SecondaryButton>;
    }
    case 'ghost': {
      return <GhostButton
        variant='contained'
        disabled={disabled}
        onClick={cb}
      >
        {title}
      </GhostButton>;
    }
    default: {
      return null;
    }
  }
};

export default CustomButton;
