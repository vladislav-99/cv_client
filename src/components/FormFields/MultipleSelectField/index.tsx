import React, { useEffect } from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

interface ISelectOption {
  value: string,
  label: string
}

interface MultipleSelectFieldProps {
  options: ISelectOption[],
  initialValue?: ISelectOption[],
  label?: string,
  placeholder?: string,
  onSelect: (selected: ISelectOption[]) => void
}

const CustomInput = styled(InputBase)({
  backgroundColor: '#fff',
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    fontFamily: 'Nunito',
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
});

const CustomControl = styled(FormControl)({
  '& .MuiInputLabel-root.Mui-focused': {
    display: 'none'
  }
})

const MultipleSelectField: React.FC<MultipleSelectFieldProps> = ({
  options,
  label,
  initialValue = [],
  placeholder = '',
  onSelect
}) => {

  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [selectedEntities, setSelecteEntities] = React.useState<ISelectOption[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedOptions>) => {
    const {
      target: { value }
    } = event;
    setSelectedOptions(
      typeof value === 'string' ? [] : value,
    )
  };

  useEffect(() => {
    setSelecteEntities(options.filter(({ value }) => ~selectedOptions.indexOf(value)));
  }, [selectedOptions])

  useEffect(() => {
    onSelect(selectedEntities);
  }, [selectedEntities])


  useEffect(() => {
    if (initialValue.length) setSelectedOptions(initialValue.map(({ value }) => value));
  }, [initialValue])

  const renderValue = !selectedOptions.length || !initialValue
    ?
    (selected: string[]) => (
      <Typography
        variant='body1'
        sx={{
          fontFamily: 'Nunito',
          color: '#D0D4DA',
        }}
      >
        {placeholder}
      </Typography>
    ) : (selected: string[]) => (
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 0.5
      }}>
        {selectedEntities.map((option) => {
          return (
            <Chip
              key={option.value}
              sx={{
                backgroundColor: '#F0F2F5',
                color: '#9EA9BA',
                height: '30px',
                fontSize: '14px',
                px: '5px',
              }}
              label={option.label}
            />
          )
        })}
      </Box>
    );

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

        <Select
          displayEmpty
          multiple
          value={selectedOptions}
          onChange={handleChange}
          input={<CustomInput />}
          renderValue={renderValue}
        >
          {
            options.map(
              (option, index) => (<MenuItem key={index + option.value} value={option.value}>{option.label}</MenuItem>)
            )
          }
        </Select>
      </CustomControl>
    </Box >
  );
}

export default MultipleSelectField