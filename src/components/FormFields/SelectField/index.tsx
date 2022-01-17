import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import useSelect, { ISelectOption } from '../../../utils/useSelect';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';

interface SelectFieldProps<T> {
  options: T[],
  optionLabelKey: keyof T,
  optionValueKey: keyof T,
  initialValue?: string,
  label: string,
  onSelect: (selected?: T) => void
}

const BootstrapInput = styled(InputBase)({

  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
    // '&:focus': {
    //   display: 'none'
    // },
  },
});

const CustomControl = styled(FormControl)({
  '& .MuiInputLabel-root.Mui-focused': {
    display: 'none'
  }
})

const SelectField = <T extends ISelectOption,>({
  options,
  optionLabelKey,
  optionValueKey,
  label,
  initialValue = '',
  onSelect
}: React.PropsWithChildren<SelectFieldProps<T>>) => {
  const {
    options: selectOptions,
    selected,
    selectedEntity,
    changeSelected
  } = useSelect(options, optionLabelKey, optionValueKey)

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    changeSelected(value)

  };

  useEffect(() => {
    onSelect(selected);
  }, [selected])

  const renderValue = !selected && !initialValue
    ?
    (value: string) => (
      <Typography
        variant='body1'
        sx={{
          fontFamily: 'Nunito',
          color: '#D0D4DA',
        }}
      >
        Technology type
      </Typography>
    ) : undefined;

  return (
    <Box sx={{
      minWidth: 120,
      mb: 1.5
    }}>
      <InputLabel
        sx={{
          fontFamily: 'Nunito',
          color: '#9EA9BA',
          mb: 1.5
        }}
      >{label}</InputLabel>
      <CustomControl fullWidth>

        <Select
          displayEmpty
          value={selectedEntity ? selectedEntity.value : initialValue}
          onChange={handleChange}
          input={<BootstrapInput />}
          renderValue={renderValue}
        >
          {selectOptions &&
            selectOptions.map(
              (option, index) => (<MenuItem key={index + option.value} value={option.value}>{option.label}</MenuItem>)
            )
          }
        </Select>
      </CustomControl>
    </Box >
  );
}

export default SelectField