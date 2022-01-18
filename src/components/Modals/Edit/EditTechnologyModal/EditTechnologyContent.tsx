import React, { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import InputField from '../../../FormFields/InputField';
import Button from '../../../Button';
import { CreatedTehnologyType, TechnologyTypes } from '../../../../store/technologies/types';
import SelectField from '../../../FormFields/SelectField';
import { getOptionsFromEnum } from '../../../FormFields/SelectField/helpers';
import { ISelectOption } from '../../../../utils/useSelect';

interface ModalContentProps {
  initialValue: {
    name: string,
    type: string
  },
  onSave: (value: CreatedTehnologyType) => void
}

const EditTechnologyContent: React.FC<ModalContentProps> = ({
  initialValue = {
    name: '',
    type: ''
  },
  onSave,
}) => {
  const [technology, setTechnology] = useState(initialValue);

  const handleChangeName = (value: string) => {
    setTechnology(technology => ({
      ...technology,
      name: value
    }))
  };


  const handleChangeType = (value: string) => {
    setTechnology(technology => ({
      ...technology,
      type: value
    }));
  };

  const isHasEmptyField = useMemo(
    () => technology.name.trim() === '' || technology.type.trim() === '',
    [technology]
  );

  const handleSaveEducations = () => {
    onSave(technology as CreatedTehnologyType);
    setTechnology({
      name: '',
      type: ''
    });
  };

  const technologyOptions = useMemo(() => getOptionsFromEnum(TechnologyTypes), [])

  const handleSelectType = (selected?: ISelectOption) => {
    if (selected) {
      handleChangeType(selected.value)
    }
  }

  return (
    <>
      <Box
        sx={{
          flex: 1
        }}
      >
        <InputField
          value={technology.name}
          label='Technology'
          placeholder='Technology'
          onChangeHandler={handleChangeName}
        />
        <SelectField
          options={technologyOptions}
          optionLabelKey={'label'}
          optionValueKey={'value'}
          initialValue={technology.type}
          onSelect={handleSelectType}
          label='Type'
          placeholder='Technology Type'
        />
      </Box>
      <Box>
        <Button
          title='Save Technology'
          disabled={isHasEmptyField}
          cb={handleSaveEducations}
        />
      </Box>
    </>
  );
};

export default EditTechnologyContent;
