import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';

const CssTextField = styled(FormControl)({
  backgroundColor: '#FFFFFF',
  '& label.Mui-focused': {
    color: '#5893F9'
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '5px',
    '& input': {
      fontFamily: 'Nunito',
      paddingTop: 11,
      paddingBottom: 11
    },
    '& input::placeholder': {
      color: '#D0D4DA'
    },
    '& fieldset': {
      borderColor: '#E3E3EA'
    },
    '&:hover fieldset': {
      borderColor: '#535E6C'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#5893F9'
    }
  }
});

interface InputFieldProps {
  value: string;
  label?: string;
  placeholder?: string;
  multiline?: boolean;
  onChangeHandler: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  label,
  placeholder,
  multiline = false,
  onChangeHandler
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeHandler(event.target.value);
  };

  const id = useMemo(
    () => '_' + Math.random().toString(36).substring(2, 9),
    []
  );
  return (
    <Box>
      <InputLabel
        htmlFor={id}
        sx={{
          fontFamily: 'Nunito',
          color: '#9EA9BA',
          mb: 1.5
        }}
      >
        {label}
      </InputLabel>

      <CssTextField fullWidth sx={{ mb: 1.5 }} variant="outlined">
        <OutlinedInput
          sx={{
            fontFamily: 'Nunito',
          }}
          multiline={multiline}
          rows={multiline ? 3 : undefined}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </CssTextField>
    </Box>
  );
};

export default InputField;
