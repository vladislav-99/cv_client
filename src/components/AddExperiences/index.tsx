import React, { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import InputField from '../InputField';
import AddButton from '../AddButton';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '../../icons/DeleteIcon';
import { createExperiences } from '../../store/experiences/actions';
import { useDispatch } from 'react-redux';

const AddExperiences: React.FC = () => {
  const [experiences, setExperience] = useState(['']);
  const dispatch = useDispatch();

  const handleChange = (index: number) => (value: string) => {
    setExperience((experiencesState) => {
      const copyExperience = [...experiencesState];
      copyExperience[index] = value;
      return copyExperience;
    });
  };

  const handleAddCompany = () => {
    setExperience([...experiences, '']);
  };

  const isHasEmptyField = useMemo(
    () =>
      !!~experiences.findIndex(
        (experienceName) => experienceName.trim() === ''
      ),
    [experiences]
  );

  const handleSaveExperiences = () => {
    dispatch(createExperiences.started(experiences));
    setExperience(['']);
  };

  const handleCancelField = (index: number) => () => {
    setExperience((experiencesState) => {
      const copyExperiences = [...experiencesState];
      copyExperiences.splice(index, 1);
      return copyExperiences;
    });
  };

  return (
    <>
      {experiences.map((experience, index, self) => (
        <Stack key={index} direction="row" alignItems="flex-end">
          <Box
            sx={{
              flex: 1
            }}
          >
            <InputField
              value={experience}
              label="Company"
              placeholder="Company name"
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
        <AddButton secondary title="+ Add Company" cb={handleAddCompany} />
      </Box>
      <Box>
        <AddButton
          title="Save Experience"
          disabled={isHasEmptyField}
          cb={handleSaveExperiences}
        />
      </Box>
    </>
  );
};

export default AddExperiences;
