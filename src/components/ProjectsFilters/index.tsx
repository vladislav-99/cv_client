import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack'
import Search from '../Search';
import SelectField from '../FormFields/SelectField';
import { getOptionsFromEnum } from '../FormFields/SelectField/helpers';
import { ProjectTypes } from '../../store/projects/types';
import { RootState } from '../../store';
import useFetchTecnologies from '../../utils/useFetch/useFetchTechnologies';
import MultipleAutocompleteField from '../FormFields/MultipleAutocompleteField';
import { ISelectOption } from '../../utils/useSelect';
import MultipleSelectField from '../FormFields/MultipleSelectField';
import Box from '@mui/material/Box';
import { border } from '@mui/system';

const ProjectsFilters: React.FC = () => {
  // const dispatch = useDispatch()
  const toggleSelect = () => { }

  const { technologiesIds, technologies } = useSelector(({ technologiesState }: RootState) => technologiesState)
  useFetchTecnologies()

  const projectsOptions = useMemo(() => getOptionsFromEnum(ProjectTypes), [])

  const technologiesOptions = useMemo(() => {
    return technologiesIds.map(id => ({
      value: String(id),
      label: technologies[id].name
    }))
  }, [technologiesIds, technologies])

  return (
    <Stack
      direction='row'
      alignItems='center'
      spacing={1}
    >
      <Search placeholder="Search project" />

      {/* <SelectField
        options={projectsOptions}
        optionLabelKey={'label'}
        optionValueKey={'value'}
        placeholder='Type'
        onSelect={toggleSelect}
      /> */}
      <MultipleSelectField
        style={{
          width: '160px',
        }}
        options={projectsOptions}
        placeholder='Type'
        onSelect={(selected: ISelectOption[]) => {

        }}
      />


      <MultipleSelectField
        style={{
          width: '190px',
        }}
        options={technologiesOptions}
        placeholder='Technologies'
        onSelect={(selected: ISelectOption[]) => {

        }}
      />

    </Stack>

  );
};

export default ProjectsFilters;
