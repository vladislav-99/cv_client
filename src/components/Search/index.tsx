import React, { RefObject } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import useFocus from "../../utils/useFocus";

const CssTextField = styled(FormControl)({
  backgroundColor: '#FFFFFF',
  '& label.Mui-focused': {
    color: '#5893F9',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '5px',
    '& input': {
      fontFamily: 'Nunito',
      paddingTop: 11,
      paddingBottom: 11
    },
    '& fieldset': {
      borderColor: '#E3E3EA',
    },
    '&:hover fieldset': {
      borderColor: '#535E6C',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#535E6C',
    },
  },
});

interface SearchProps {
  placeholder?: string
}

const Search: React.FC<SearchProps> = ({ placeholder }) => {
  const [search, setSearch] = React.useState('');
  const [ref, isFocused] = useFocus<RefObject<HTMLDivElement>>()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };


  return (
    <CssTextField sx={{ my: 3, width: '300px' }} variant="outlined">
      <OutlinedInput
        placeholder={placeholder}
        inputProps={
          {
            ref: ref
          }
        }
        value={search}
        onChange={handleChange}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon sx={{
              color: isFocused ? '#535E6C' : '#D0D4DA'
            }} />
          </InputAdornment>
        }
      />
    </CssTextField>)
}

export default Search
