import React, { useMemo, useState } from "react";

import Box from '@mui/material/Box'
import InputField from "../InputField";
import AddButton from "../AddButton";


const AddEducations: React.FC = () => {
  const [universities, setUniversities] = useState(['']);


  const handleChange = (index: number) => (value: string) => {
    const copyUniversities = [...universities];
    copyUniversities[index] = value;
    setUniversities(copyUniversities)
  }

  const handleAddUniversity = () => {
    setUniversities([...universities, ''])
  }

  const isHasEmptyField = useMemo(() => !!~universities.findIndex(universityName => universityName.trim() === ''), [universities])

  return <>
    {universities.map((university, index) =>
      <InputField
        key={index}
        value={university}
        label='University'
        placeholder='University'
        onChangeHandler={handleChange(index)}
      />)}
    <Box mb={1}>
      <AddButton title="+ Add University" secondary cb={handleAddUniversity} />
    </Box>
    <Box>
      <AddButton title="Save Universities" disabled={isHasEmptyField} cb={() => { }} />
    </Box>
  </>
}

export default AddEducations