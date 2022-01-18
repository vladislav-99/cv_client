import React, { useMemo } from 'react';
import Stack from '@mui/material/Stack';
import Title from '../Title';
import Search from '../Search';
import Button from '../Button';
import { getOptionsFromEnum } from '../FormFields/SelectField/helpers';
import SelectField from '../FormFields/SelectField';

enum ProjectTypes {
  WEB_SERVICE = 'Web Service',
  WEB_SITE = 'Web Site',
  CRM = 'CRM Sistem'
}

const ProjectsFilters: React.FC = () => {

  const toggleSelect = () => { }

  const projectsOptions = useMemo(() => getOptionsFromEnum(ProjectTypes), [])


  return (
    <Stack
      direction='row'
      alignItems='center'
      spacing={1}
    >
      <Search placeholder="Search project" />
      <SelectField
        options={projectsOptions}
        optionLabelKey={'label'}
        optionValueKey={'value'}
        placeholder='Type'
        onSelect={toggleSelect}
      />
    </Stack>

  );
};

export default ProjectsFilters;
