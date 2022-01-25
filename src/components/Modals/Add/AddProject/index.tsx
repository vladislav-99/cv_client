import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';
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
import AddPhotoZone, { ImageUploadingProgress, ImageUploadedType } from '../../../FormFields/AddPhotoZone';
import PhotoCard from '../../../FormFields/PhotoCard';
import api from '../../../../libs/api';
import { useUnmount } from 'react-use';


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
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => {
      setIsMounted(false)
    }
  }, [])
  const [project, setProject] = useState<CreatingProjectType>(initialProject);
  const [isSaved, setIsSaved] = useState(false);
  const [uploadingImage, setUploadingImage] = useState<ImageUploadingProgress>({
    name: '',
    progress: 0
  });

  const [photos, setPhotos] = useState<ImageUploadedType[]>([]);

  const dispatch = useDispatch();
  const { technologiesIds, technologies } = useSelector(({ technologiesState }: RootState) => technologiesState)

  useEffect(() => {
    if (!technologiesIds.length)
      dispatch(fetchTechnologies.started())
  }, [])

  useEffect(() => {
    const urls = photos.map(({ url }) => url)
    setProject(prevProject => ({
      ...prevProject,
      photos: urls
    }))
  }, [photos])

  useUnmount(() => {
    const urls = photos.map(({ url }) => url)
    console.log('urls: ', urls);
    if (photos.length && !isSaved) {
      urls.forEach(url => api.delete(url).then())
    }
  })


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
    (value: number[]) => {
      setProject((projectState) => {
        const copyProject = { ...projectState };
        copyProject.technologies = value;
        return copyProject;
      });
    };

  const handleChangePhotos =
    (value: ImageUploadedType) => {

      setPhotos((prevPhotos) => {
        return [value, ...prevPhotos]
      })

      setUploadingImage({
        name: '',
        progress: 0
      })

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
    setIsSaved(true)

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
    handleChangeTechnologies(selectedIds)
  }

  const technologiesOptions = useMemo(() => {
    return technologiesIds.map(id => ({
      value: String(id),
      label: technologies[id].name
    }))
  }, [technologiesIds])

  const handleUploadingImage = useCallback((uplading: ImageUploadingProgress) => {
    setUploadingImage(uplading)
  }, [])

  const handleCloseCard = (url: string) => {
    api.delete(url).then(response => {
      if (response.status === 200) {
        setPhotos((prevPhotos) => {
          const index = prevPhotos.findIndex((photo) => photo.url === url);
          const copiedPhoto = [...prevPhotos];
          copiedPhoto.splice(index, 1);
          return copiedPhoto
        })
      }
    })
  }

  const handleCloseUploadingCard = (url: string) => {
    setUploadingImage({
      name: '',
      progress: 0
    })
  }

  const px = '3px'

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent='space-between'
        px={px}
      >
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
            width: '230px',
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
      <Stack
        direction="row"
        alignItems="center"
        justifyContent='space-between'
        px={px}
      >
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
      <Box
        px={px}
      >
        <MultipleAutocompleteField
          label='Technologies'
          options={technologiesOptions}
          onSelect={handleSelectTechnologies}
          placeholder='Select technologies'
        />
      </Box>
      <Box
        px={px}
      >
        <InputField
          multiline
          value={project.description}
          label="Description"
          placeholder="Description"
          onChangeHandler={handleChangeStringField('description')}
        />
      </Box>
      <Box
        px={px}
        my={1}
        sx={{
          height: '60px',
        }}
      >
        <AddPhotoZone
          onUpload={handleChangePhotos}
          handleUploading={handleUploadingImage}
        />
      </Box>
      <Grid
        my={2}
        container
        rowGap={1}
        columnGap={2.5}
        columns={2}
      >
        {
          uploadingImage.name && <PhotoCard
            image={{
              name: uploadingImage.name,
              progress: uploadingImage.progress
            }}
            onClose={handleCloseUploadingCard}
          />
        }
        {
          photos.map((image, index) => {
            return <PhotoCard
              onClose={handleCloseCard}
              image={image}
              key={index} />
          })
        }
      </Grid>
      <Box
        px={px}
      >
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
