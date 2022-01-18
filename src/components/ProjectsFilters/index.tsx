import React, { useMemo } from 'react';
import Stack from '@mui/material/Stack'
import Search from '../Search';
import { getOptionsFromEnum } from '../FormFields/SelectField/helpers';
import SelectField from '../FormFields/SelectField';
import { ProjectTypes } from '../../store/projects/types';

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
