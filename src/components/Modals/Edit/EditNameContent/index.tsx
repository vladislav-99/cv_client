import React, { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import InputField from '../../../FormFields/InputField';
import AddButton from '../../../AddButton';

interface ModalContentProps {
  fieldLabel: string,
  buttonLabel: string,
  initialValue: string,
  onSave: (value: string) => void
}

const EditNameContent: React.FC<ModalContentProps> = ({
  initialValue = '',
  onSave,
  fieldLabel,
  buttonLabel,
}) => {
  const [name, setName] = useState(initialValue);

  const handleChange = (value: string) => {
    setName(value)
  };

  const isHasEmptyField = useMemo(
    () => name.trim() === '' || name === initialValue,
    [initialValue, name]
  );

  const handleSaveEducations = () => {
    onSave(name);
    setName('');
  };

  return (
    <>
      <Box
        sx={{
          flex: 1
        }}
      >
        <InputField
          value={name}
          label={fieldLabel}
          placeholder={fieldLabel}
          onChangeHandler={handleChange}
        />
      </Box>
      <Box>
        <AddButton
          title={buttonLabel}
          disabled={isHasEmptyField}
          cb={handleSaveEducations}
        />
      </Box>
    </>
  );
};

export default EditNameContent;
