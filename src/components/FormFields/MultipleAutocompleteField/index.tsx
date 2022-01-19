import React from 'react';
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
  onSelect: (selected: ISelectOption[]) => void
}

const CustumizedInput = styled(TextField)({
  backgroundColor: '#fff',
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    border: '1px solid #fff',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
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
  }
})

const MultipleAutocompleteField: React.FC<MultipleAutocompleteFieldProps> = ({
  options,
  label,
  initialValue = [],
  placeholder = '',
  onSelect
}) => {

  const handleOnSelect = (event: React.SyntheticEvent<Element, Event>, values: (ISelectOption | string)[]) => {
    const selected = [...values].filter(option => typeof option !== 'string') as ISelectOption[]
    onSelect(selected)
  }

  return (
    <Box sx={{
      minWidth: 120,
      mb: 1.5
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
          defaultValue={initialValue}
          freeSolo
          disableCloseOnSelect
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
