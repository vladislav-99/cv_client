import React, { useState } from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';

interface ISelectOption {
  value: string,
  label: string
}

interface MultipleAutocompleteFieldProps {
  options: ISelectOption[],
  initialValue?: ISelectOption[],
  label?: string,
  placeholder?: string,
  onSelect: (selected: ISelectOption[]) => void,
  style?: object
}

const CustumizedInput = styled(TextField)({
  backgroundColor: '#fff',
  '& .MuiOutlinedInput-root': {

    borderRadius: '5px',
    '& input': {
      fontFamily: 'Nunito',
    },
    '& fieldset': {
      borderColor: '#E3E3EA'
    },
    '&:hover fieldset': {
      borderColor: '#535E6C'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#535E6C'
    }
  },
  // border: '1px solid green',
  // '& .MuiAutocomplete-input': {
  //   width: '500px',

  // },
  '& .MuiInputBase-input': {
    height: '28px',
    borderRadius: 4,
    position: 'relative',
    // border: '1px solid #fff',
    fontSize: 16,
    fontFamily: 'Nunito',
    '&:focus': {
      borderColor: '#fff',
      outline: 'none'
    },
  },
});

const CustomControl = styled(FormControl)({
  '& .MuiInputLabel-root.Mui-focused': {
    display: 'none'
  },
})

const MultipleAutocompleteField: React.FC<MultipleAutocompleteFieldProps> = ({
  options,
  label,
  initialValue = [],
  placeholder = '',
  style = {},
  onSelect
}) => {

  const handleOnSelect = (event: React.SyntheticEvent<Element, Event>, values: (ISelectOption | string)[]) => {
    const selected = [...values].filter(option => typeof option !== 'string') as ISelectOption[]
    setValue(selected)
    onSelect(selected)
  }
  const [value, setValue] = useState(initialValue)
  const [inputValue, setInputValue] = useState('');

  return (
    <Box sx={{
      minWidth: 120,
      mb: 1.5,
      ...style
    }}>
      {label && <InputLabel
        sx={{
          fontFamily: 'Nunito',
          color: '#9EA9BA',
          mb: 1.5
        }}
      >{label}</InputLabel>}
      <CustomControl fullWidth>



        <Autocomplete
          multiple
          id="tags-filled"
          options={options}
          value={value}
          freeSolo
          size="small"
          disableCloseOnSelect
          openOnFocus
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue)
          }}
          renderTags={(value: ISelectOption[], getTagProps) =>
            value.map((option: ISelectOption, index: number) => (
              <Chip
                sx={{
                  backgroundColor: '#F0F2F5',
                  color: '#9EA9BA',
                  height: '30px',
                  fontSize: '14px',
                  px: '5px',
                }}
                label={option.label}
                deleteIcon={<CloseIcon />}
                {...getTagProps({ index })}
              />
            ))
          }
          onChange={handleOnSelect}
          renderInput={(params) => (
            <CustumizedInput
              {...params}
              placeholder={placeholder}
            />
          )}
          renderOption={(props, option, { inputValue }) => {
            return <MenuItem {...props} key={'_' + Math.random().toString(36).substr(2, 9) + option.value} value={option.value}>{option.label}</MenuItem>
          }}
        />
      </CustomControl>
    </Box >
  );
}

export default MultipleAutocompleteField
