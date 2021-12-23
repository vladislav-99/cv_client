import React, { useMemo, useState } from "react";

import Box from '@mui/material/Box'
import InputField from "../InputField";
import AddButton from "../AddButton";


const AddExperiences: React.FC = () => {
  const [universities, setCompanies] = useState(['']);


  const handleChange = (index: number) => (value: string) => {
    const copyCompanies = [...universities];
    copyCompanies[index] = value;
    setCompanies(copyCompanies)
  }

  const handleAddCompany = () => {
    setCompanies([...universities, ''])
  }

  const isHasEmptyField = useMemo(() => !!~universities.findIndex(universityName => universityName.trim() === ''), [universities])

  return <>
    {universities.map((university, index) =>
      <InputField
        key={index}
        value={university}
        label='Company'
        placeholder='Company'
        onChangeHandler={handleChange(index)}
      />)}
    <Box mb={1}>
      <AddButton title="+ Add Company" secondary cb={handleAddCompany} />
    </Box>
    <Box>
      <AddButton title="Save Companies" disabled={isHasEmptyField} cb={() => { }} />
    </Box>
  </>
}

export default AddExperiences