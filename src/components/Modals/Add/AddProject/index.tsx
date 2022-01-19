import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import InputField from '../../../FormFields/InputField';
import Button from '../../../Button';
import Stack from '@mui/material/Stack';
import SelectField from '../../../FormFields/SelectField';
import { getOptionsFromEnum } from '../../../FormFields/SelectField/helpers';
import { CreateProjectType, ProjectTypes } from '../../../../store/projects/types';
import MultipleAutocompleteField from '../../../FormFields/MultipleAutocompleteField';
import { RootState } from '../../../../store';
import { fetchTechnologies } from '../../../../store/technologies/actions';
import { fetchCreateProject } from '../../../../store/projects/actions';


type CreatingProjectType = {
  name: string,
  type: string,
  country: string,
  link: string,
  technologies: number[],
  description: string,
  photos: string[]
}

const initialProject: CreatingProjectType = {
  name: '',
  type: '',
  country: '',
  link: '',
  technologies: [],
  description: '',
  photos: []
}
interface AddProjectProps {
  onAdd?: () => void
}
const AddProject: React.FC<AddProjectProps> = ({ onAdd }) => {
  const [project, setProject] = useState<CreatingProjectType>(initialProject);
  const dispatch = useDispatch();
  const { technologiesIds, technologies } = useSelector(({ technologiesState }: RootState) => technologiesState)
  useEffect(() => {
    if (!technologiesIds.length)
      dispatch(fetchTechnologies.started())
  }, [])

  const handleChangeStringField = (
    fieldName: keyof Omit<
      CreatingProjectType,
      "technologies" | "photos"
    >) => (value: string) => {
      setProject((projectState) => {
        const copyProject = { ...projectState };
        copyProject[fieldName] = value;
        return copyProject;
      });
    };

  const handleChangeTechnologies =
    (fieldName: "technologies") =>
      (value: number[]) => {
        setProject((projectState) => {
          const copyProject = { ...projectState };
          copyProject[fieldName] = value;
          return copyProject;
        });
      };

  const handleChangePhotos =
    (fieldName: "technologies") =>
      (value: number[]) => {
        setProject((projectState) => {
          const copyProject = { ...projectState };
          copyProject[fieldName] = value;
          return copyProject;
        });
      };

  const isHasEmptyField = useMemo(
    () => {
      const {
        name,
        type
      } = project;
      if (!name.trim() || !type) return true

      return false
    },
    [project]
  );

  const handleSaveProject = () => {
    dispatch(fetchCreateProject.started(project as CreateProjectType))
    setProject(initialProject)
    onAdd && onAdd()
  };

  const projectOptions = useMemo(() => getOptionsFromEnum(ProjectTypes), [])

  const handleSelectProjectType = (selected?: {
    value: string;
    label: string;
  }) => {
    handleChangeStringField('type')(selected ? selected.value : '')
  }

  const handleSelectTechnologies = (selected: {
    value: string;
    label: string;
  }[]) => {
    const selectedIds = selected.map(({ value }) => Number(value));
    handleChangeTechnologies('technologies')(selectedIds)
  }

  const technologiesOptions = useMemo(() => {
    return technologiesIds.map(id => ({
      value: String(id),
      label: technologies[id].name
    }))
  }, [technologiesIds])

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent='space-between'>
        <Box
          sx={{
            width: '450px'
          }}
        >
          <InputField
            value={project.name}
            label="Project name"
            placeholder="Project name"
            onChangeHandler={handleChangeStringField('name')}
          />
        </Box>

        <Box
          sx={{
            width: '230px'
          }}
        >
          <SelectField
            label='Type'
            options={projectOptions}
            optionLabelKey={'label'}
            optionValueKey={'value'}
            onSelect={handleSelectProjectType}
            placeholder='Technology Type'
          />
        </Box>

      </Stack>
      <Stack direction="row" alignItems="center" justifyContent='space-between'>
        <Box
          sx={{
            width: '250px'
          }}
        >
          <InputField
            value={project.country}
            label="Country"
            placeholder="Country"
            onChangeHandler={handleChangeStringField('country')}
          />
        </Box>

        <Box
          sx={{
            width: '430px'
          }}
        >
          <InputField
            value={project.link}
            label="Link"
            placeholder="Link"
            onChangeHandler={handleChangeStringField('link')}
          />
        </Box>

      </Stack>
      <Box>
        <MultipleAutocompleteField
          label='Technologies'
          options={technologiesOptions}
          onSelect={handleSelectTechnologies}
          placeholder='Select technologies'
        />
      </Box>
      <Box>
        <InputField
          multiline
          value={project.description}
          label="Description"
          placeholder="Description"
          onChangeHandler={handleChangeStringField('description')}
        />
      </Box>
      <Box>
        <Button
          title="Save Project"
          disabled={isHasEmptyField}
          cb={handleSaveProject}
        />
      </Box>
    </>
  );
};

export default AddProject;
