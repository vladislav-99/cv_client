import React, { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import InputField from '../InputField';
import AddButton from '../AddButton';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '../../icons/DeleteIcon';
import { Stack } from '@mui/material';

const AddEducations: React.FC = () => {
  const [universities, setUniversities] = useState(['']);

  const handleChange = (index: number) => (value: string) => {
    setUniversities(universitiesState => {
      const copyUniversities = [...universitiesState];
      copyUniversities[index] = value;
      return copyUniversities
    });
  };

  const handleAddUniversity = () => {
    setUniversities([...universities, '']);
  };

  const isHasEmptyField = useMemo(
    () =>
      !!~universities.findIndex(
        (universityName) => universityName.trim() === ''
      ),
    [universities]
  );

  const handleCancelField = (index: number) => () => {
    setUniversities(universitiesState => {
      const copyUniversities = [...universitiesState];
      copyUniversities.splice(index, 1);
      return copyUniversities
    });
  };

  return (
    <>
      {universities.map((university, index, self) => (
        <Stack
          key={index}
          direction="row"
          alignItems="flex-end"
        >
          <Box
            sx={{
              flex: 1
            }}
          >
            <InputField
              value={university}
              label="University"
              placeholder="University"
              onChangeHandler={handleChange(index)}
            />
          </Box>
          {self.length > 1 && (
            <IconButton
              sx={{
                m: '15px',
                height: '40px',
                width: '40px',
                borderRadius: '5px',
                backgroundColor: '#F1F3F5'
              }}
              onClick={handleCancelField(index)}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Stack>
      ))}
      <Box mb={1}>
        <AddButton
          title="+ Add University"
          secondary
          cb={handleAddUniversity}
        />
      </Box>
      <Box>
        <AddButton
          title="Save Universities"
          disabled={isHasEmptyField}
          cb={() => { }}
        />
      </Box>
    </>
  );
};

export default AddEducations;
