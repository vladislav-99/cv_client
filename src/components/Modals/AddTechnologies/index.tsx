import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import InputField from '../../FormFields/InputField';
import AddButton from '../../AddButton';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '../../../icons/DeleteIcon';
import { Divider, Stack } from '@mui/material';
import { createEducations } from '../../../store/educations/actions';
import SelectField from '../../FormFields/SelectField';

const AddTechnologies: React.FC = () => {
  const [technologies, setTechnologies] = useState([{
    name: '',
    type: ''
  }]);
  const dispatch = useDispatch();

  const handleChangeName = (index: number) => (value: string) => {
    setTechnologies((technologiesState) => {
      const copyTechnologies = [...technologiesState];
      copyTechnologies[index].name = value;
      return copyTechnologies;
    });
  };

  const handleChangeType = (index: number) => (value: string) => {
    setTechnologies((technologiesState) => {
      const copyTechnologies = [...technologiesState];
      copyTechnologies[index].type = value;
      return copyTechnologies;
    });
  };

  const handleAddTechnology = () => {
    setTechnologies([...technologies, {
      name: '',
      type: ''
    }]);
  };

  const isHasEmptyField = useMemo(
    () =>
      !!~technologies.findIndex(
        (technology) => technology.name.trim() === '' || technology.type.trim() === ''
      ),
    [technologies]
  );

  const handleCancelField = (index: number) => () => {
    setTechnologies((technologiesState) => {
      const copyTechnologies = [...technologiesState];
      copyTechnologies.splice(index, 1);
      return copyTechnologies;
    });
  };

  const handleSaveEducations = () => {
    // dispatch(createEducations.started(technologies));
    setTechnologies([{
      name: '',
      type: ''
    }]);
  };

  const technologiesOptions = [
    {
      value: 'FRONT-END',
      label: 'Front end'
    }, {
      value: 'BACK-END',
      label: 'Back end'
    },

  ];

  const handleSelect = (index: number) => (selected?: {
    value: string;
    label: string;
  }) => {
    handleChangeType(index)(selected ? selected.value : '')
  }

  console.log('technologies: ', technologies);

  return (
    <>
      {technologies.map((technology, index, self) => (
        <Stack key={index} direction="row" alignItems="flex-start">
          <Box
            sx={{
              flex: 1
            }}
          >
            <InputField
              value={technology.name}
              label="Technology"
              placeholder="Technology"
              onChangeHandler={handleChangeName(index)}
            />
            <SelectField
              label='Type'
              options={technologiesOptions}
              optionLabelKey={'label'}
              optionValueKey={'value'}
              onSelect={handleSelect(index)}
            />
            {index !== self.length - 1 && < Divider sx={{
              my: 3
            }} />}

          </Box>
          {self.length > 1 && (
            <IconButton
              sx={{
                m: '15px',
                mt: '38px',
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
          title="+ Add Technology"
          secondary
          cb={handleAddTechnology}
        />
      </Box>
      <Box>
        <AddButton
          title="Save Technologies"
          disabled={isHasEmptyField}
          cb={handleSaveEducations}
        />
      </Box>
    </>
  );
};

export default AddTechnologies;
